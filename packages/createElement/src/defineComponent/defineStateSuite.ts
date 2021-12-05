import { Context, defineView, Fragment, IFunctionComponent } from '..'
import { ShrioProps } from './type'
import { definePortal, IPortal } from '..'

export interface IStateFactory<P extends {}, S extends {}> {
  (props: P, children: Node[], ctx: Context): S
}

export const defineStateSuite = <P extends {}, S extends {}>(
  stateFactory: IStateFactory<P, S>,
  defaultProps?: P,
): {
  StateView: IFunctionComponent<
    P &
      ShrioProps &
      Record<string, unknown> & {
        scope: IFunctionComponent<Record<string, unknown>>
      }
  >
  portal: IPortal<S>
} => {
  const portal = definePortal<S>()

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

      return props.scope
        ? props.scope(state, children, ctx)
        : Fragment(null, children)
    },
  )

  const inject = () => {
    let state = portal.inject()
    if (state) {
      return state
    } else {
      const state = stateFactory(defaultProps! ?? {}, [], undefined!)
      console.log('res', state)

      portal.provide(state)

      return state
    }
  }

  return {
    StateView,
    portal: {
      ...portal,
      inject,
    },
  }
}
