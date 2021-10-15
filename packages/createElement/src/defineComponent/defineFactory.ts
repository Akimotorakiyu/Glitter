import {
  Context,
  TElementValue,
  IFunctionComponent,
  IFactoryComponent,
} from '../createElement/createComponent/componentContext/type'
import { ShrioProps } from './type'
export interface IFactoryState<
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
> {
  (props: P, children: Node[], ctx: Context): [
    props: S,
    children: Node[],
    ctx: Context,
  ]
}
export interface IFactoryView<F, S> {
  (state: S, children: Node[], ctx: Context): TElementValue
}

export const defineState = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  state: IFactoryState<P, S>,
): IFactoryState<P, S> => {
  return state
}

export const defineFactory = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  stateFactory: IFactoryState<P, S>,
  view: IFunctionComponent<S>,
): IFactoryComponent<P & ShrioProps> => {
  const factory = (props: any, children: any, context: any) => {
    const [_state, _children, _context] = stateFactory(props, children, context)
    if (typeof _state !== 'object') {
      throw new Error('render should be an object')
    }
    if (_state && 'render' in _state) {
      throw new Error('render should not in state')
    }
    const com = Object.assign(_state, {
      render: () => {
        return view(_state, _children, _context)
      },
    })
    return com
  }

  return factory
}
