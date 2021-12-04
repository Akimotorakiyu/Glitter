import { Context, Fragment, IFunctionComponent } from '..'
import { ShrioProps } from './type'
import { definePortal, IPortal } from '..'

export interface IStateFactory<P extends {}, S extends {}> {
  (props: P, children: Node[], ctx: Context): S
}

export const defineStateSuite = <P extends {}, S extends {}>(
  stateFactory: IStateFactory<P, S>,
): {
  StateView: IFunctionComponent<P & ShrioProps & Record<string, unknown>>
  portal: IPortal<S>
} => {
  const portal = definePortal<S>()

  const StateView = (
    props: P & ShrioProps & Record<string, unknown>,
    children: Node[],
    ctx: Context,
  ) => {
    const state = stateFactory(props, children, ctx)

    portal.provide(state)

    return Fragment(null, children)
  }

  return {
    StateView,
    portal,
  }
}
