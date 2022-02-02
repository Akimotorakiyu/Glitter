import {
  createElement,
  definePortal,
  Fragment,
  IPortal,
  KeyType,
  _provide,
} from '@shiro/render-core'
import { markAsFunctionComponent } from '@shrio/core'

import { defineFactoryComponent } from './defineFactoryComponent'
import { IStateFactory } from './type'

const suiteKey = Symbol('suiteKey')

export type IStateSuite<
  P extends Record<string, any>,
  S extends Record<string, any>,
> = IStateFactory<P, S> & IPortal<S>

export const defineStateSuite = <
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactory: IStateFactory<P, S>,
  key?: KeyType,
): IStateSuite<P, S> => {
  if (Reflect.get(stateFactory, suiteKey)) {
    return stateFactory as IStateSuite<P, S>
  }

  const portal = definePortal<S, KeyType>(key)

  const stateSuite = (props: P, children: TElementValue[], ctx: Context) => {
    const state = stateFactory(props, children, ctx)
    portal.provide(state)
    return state
  }

  Object.assign(stateFactory, { ...portal, suiteKey: stateSuite })
  Object.assign(stateSuite, { ...portal, suiteKey: stateSuite })

  return stateSuite as IStateSuite<P, S>
}

export const defineStateSuite2 = <
  Args extends unknown[],
  S extends Record<string, any>,
>(
  stateFactory: (...args: Args) => S,
  key?: KeyType,
): ((...args: Args) => S & IPortal<S>) => {
  if (Reflect.get(stateFactory, suiteKey)) {
    return stateFactory as (...args: Args) => S & IPortal<S>
  }

  const portal = definePortal<S, KeyType>(key)

  const stateSuite = (...args: Args) => {
    const state = stateFactory(...args)
    portal.provide(state)
    return state
  }

  Object.assign(stateFactory, { ...portal, suiteKey: stateSuite })
  Object.assign(stateSuite, { ...portal, suiteKey: stateSuite })

  return stateSuite as (...args: Args) => S & IPortal<S>
}

export const ViewContext = defineFactoryComponent(
  <P extends Record<string, any>, S extends Record<string, any>>(
    props: {
      stateSuite: IStateSuite<P, S>
      scope: IFunctionComponent<Record<string, unknown>>
    } & P,
    children: TElementValue[],
    ctx: Context,
  ) => {
    const state = props.stateSuite(props, children, ctx)
    props.stateSuite.provide(state)
    return {
      state,
      rawProps: props,
    }
  },
  (props, children, ctx) => {
    if (props.rawProps.scope) {
      markAsFunctionComponent(props.rawProps.scope)
    }

    return createElement(
      props.rawProps.scope ?? (Fragment as any),
      { state: props.state },
      ...children,
    )
  },
)

markAsFunctionComponent(ViewContext)

export const DomainView = defineFactoryComponent(
  (props: {
    stateSuite: () => void
    scope: IFunctionComponent<Record<string, unknown>>
  }) => {
    const state = props.stateSuite()
    return {
      state,
      rawProps: props,
    }
  },
  (props, children) => {
    if (props.rawProps.scope) {
      markAsFunctionComponent(props.rawProps.scope)
    }

    return createElement(
      props.rawProps.scope ?? (Fragment as any),
      { state: props.state },
      ...children,
    )
  },
)

markAsFunctionComponent(DomainView)
