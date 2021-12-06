import {
  IFunctionComponent,
  IFactoryComponent,
} from '../createElement/createComponent/componentContext/type'
import { ShrioProps, IStateFactory } from './type'

export const defineFactoryComponent = <
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(
  stateFactory: IStateFactory<P, S>,
  view: IFunctionComponent<S | (S & ShrioProps)>,
): IFactoryComponent<P & ShrioProps> => {
  const factory = (props: any, children: any, context: any) => {
    const _state = stateFactory(props, children, context)
    if (typeof _state !== 'object') {
      throw new Error('render should be an object')
    }
    if (_state && 'render' in _state) {
      throw new Error('render should not in state')
    }
    const com = Object.assign(_state, {
      render: () => {
        return view(_state, children, context)
      },
    })
    return com
  }

  return factory
}
