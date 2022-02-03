import { GlitterProps, IComponentStateFactoryProto } from './type'
import { markAsStructElement, markAsFactoryComponent } from '@glitter/core'

import { createElement, Fragment, _provide } from '@glitter/render-core'
import { markAsFunctionComponent } from '@glitter/core'

export function defineFactoryComponent<
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactory: IComponentStateFactoryProto<P, S>,
  view: IFunctionComponent<S | (S & GlitterProps)>,
): IFactoryComponent<P & GlitterProps> {
  const factory = (props: any, children: any, context: any) => {
    const _state = stateFactory(props, children, context)

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

  return factory as IFactoryComponent<P & GlitterProps>
}

/**
 * 对标 defineFactoryComponent 的 view 实现
 */
export const ViewContext = defineFactoryComponent(
  <P extends Record<string, any>, S extends Record<string, any>>(
    props: {
      componentStateFactoryProto: IComponentStateFactoryProto<P, S>
      scope: IFunctionComponent<{ state: S }>
    } & P,
    children: TElementValue[],
    ctx: Context,
  ) => {
    const componentStateFactoryProto = props.componentStateFactoryProto
    const state = componentStateFactoryProto(props, children, ctx)
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
