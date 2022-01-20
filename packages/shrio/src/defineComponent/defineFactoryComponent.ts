import { ShrioProps, IStateFactory } from './type'
import { IStateSuite, defineStateSuite } from './defineStateSuite'
import { markAsStructElement, markAsFactoryComponent } from '@shrio/core'

export function defineFactoryComponent<
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactory: IStateFactory<P, S>,
  view: IFunctionComponent<S | (S & ShrioProps)>,
): IFactoryComponent<P & ShrioProps> {
  let suite = defineStateSuite(stateFactory)

  const factory = (props: any, children: any, context: any) => {
    const _state = suite(props, children, context)

    suite.provide(_state)

    if (typeof _state !== 'object') {
      throw new Error('state should be an object')
    }

    // 使用原型链的办法，可以不用介意 state 上也有一个 render
    // if (_state && 'render' in _state) {
    //   throw new Error('render should not in state')
    // }

    const com = Object.assign(Object.create(_state), {
      render: () => {
        return view(_state, children, context)
      },
    })

    markAsStructElement(com)
    return com
  }

  markAsFactoryComponent(factory)

  Reflect.set(factory, 'stateFactory', suite)

  return factory as IFactoryComponent<P & ShrioProps> & {
    stateFactory: IStateSuite<P, S>
  }
}
