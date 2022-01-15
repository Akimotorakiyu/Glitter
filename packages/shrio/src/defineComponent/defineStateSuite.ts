import {
  Context,
  createElement,
  definePortal,
  Fragment,
  getCurrentContext,
  IFunctionComponent,
  IPortal,
  _provide,
} from '@shiro/create-element'
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
  defaultProps?: P,
  key?: KeyType,
): IStateSuite<P, S> => {
  if (Reflect.get(stateFactory, suiteKey)) {
    return stateFactory as IStateSuite<P, S>
  }

  const portal = definePortal<S, KeyType>(key)

  const inject = () => {
    let state = portal.inject()
    if (state) {
      return state
    } else {
      const state = stateFactory(defaultProps! ?? {}, [], undefined!)

      const ctx = getCurrentContext()
      _provide(ctx.parent!, portal.key, state)

      return state
    }
  }

  Object.assign(stateFactory, { ...portal, inject, suiteKey: true })

  return stateFactory as IStateSuite<P, S>
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
    return createElement(
      props.rawProps.scope ?? (Fragment as any),
      { state: props.state },
      ...children,
    )
  },
)
