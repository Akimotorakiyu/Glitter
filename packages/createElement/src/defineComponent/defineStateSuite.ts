import {
  Context,
  createElement,
  defineView,
  Fragment,
  getCurrentContext,
  IFunctionComponent,
  _provide,
} from '..'
import { IStateFactory, ShrioProps } from './type'
import { definePortal, IPortal, KeyType } from '..'

export interface IStateSuite<
  P extends Record<string, any>,
  S extends Record<string, any>,
> {
  StateView: IFunctionComponent<
    P &
      ShrioProps &
      Record<string, unknown> & {
        scope: IFunctionComponent<Record<string, unknown>>
      }
  >
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

  const StateView = defineView(
    (
      props: P &
        ShrioProps &
        Record<string, unknown> & {
          scope?: IFunctionComponent<Record<string, unknown>>
        },
      children: Node[],
      ctx: Context,
    ) => {
      const state = stateFactory(props, children, ctx)

      portal.provide(state)

      return createElement(props.scope ?? (Fragment as any), state, ...children)
    },
  )

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
    StateView,
    portal: {
      ...portal,
      inject,
    },
    stateFactory,
  }
}
