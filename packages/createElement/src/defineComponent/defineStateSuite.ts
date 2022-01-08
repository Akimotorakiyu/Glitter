import {
  Context,
  createElement,
  defineFactoryComponent,
  Fragment,
  getCurrentContext,
  IFunctionComponent,
  _provide,
} from '..'
import { IStateFactory } from './type'
import { definePortal, IPortal, KeyType } from '..'

export interface IStateSuite<
  P extends Record<string, any>,
  S extends Record<string, any>,
> {
  portal: IPortal<S>
  stateFactory: IStateFactory<P, S>
}

export const defineStateSuite = <
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactory: IStateFactory<P, S>,
  defaultProps?: P,
  key?: KeyType,
): IStateSuite<P, S> => {
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

  return {
    portal: {
      ...portal,
      inject,
    },
    stateFactory,
  }
}

export const ComposeStateView = defineFactoryComponent(
  (
    props: {
      stateSuiteList: IStateSuite<{}, {}>[]
      scope: IFunctionComponent<Record<string, unknown>>
    },
    children: Node[],
    ctx: Context,
  ) => {
    const stateList = props.stateSuiteList.map((suit) => {
      const state = suit.stateFactory(props, children, ctx)
      suit.portal.provide(state)
      return state
    })

    return {
      stateList,
      rawProps: props,
    }
  },
  (props, children: Node[], ctx: Context) => {
    return createElement(
      props.rawProps.scope ?? (Fragment as any),
      { stateList: props.stateList },
      ...children,
    )
  },
)

export const ViewContext = defineFactoryComponent(
  <P extends Record<string, any>, S extends Record<string, any>>(
    props: {
      stateSuite: IStateSuite<P, S>
      scope: IFunctionComponent<Record<string, unknown>>
    } & P,
    children: Node[],
    ctx: Context,
  ) => {
    const state = props.stateSuite.stateFactory(props, children, ctx)
    props.stateSuite.portal.provide(state)
    return {
      state,
      rawProps: props,
    }
  },
  (props, children: Node[], ctx: Context) => {
    return createElement(
      props.rawProps.scope ?? (Fragment as any),
      { state: props.state },
      ...children,
    )
  },
)
