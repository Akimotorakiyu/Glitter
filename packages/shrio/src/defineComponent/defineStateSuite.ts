import { definePortal, IPortal, KeyType, _provide } from '@shiro/render-core'

import { IComponentStateFactoryProto } from './type'

const suiteKey = Symbol('suiteKey')

export type IStateFactory<
  P extends Record<string, any>,
  S extends Record<string, any>,
> = IComponentStateFactoryProto<P, S> & IPortal<S>

/**
 * 仅为 工厂组件 使用的 defineStateFactory 为 defineComponentStateFactory
 * 日常 组合式开发 应使用 defineStateFactory
 * @param stateFactoryProto
 * @param key
 * @returns
 */
export const defineComponentStateFactory = <
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactoryProto: IComponentStateFactoryProto<P, S>,
  key?: KeyType,
): IStateFactory<P, S> => {
  if (Reflect.get(stateFactoryProto, suiteKey)) {
    return stateFactoryProto as IStateFactory<P, S>
  }

  const portal = definePortal<S, KeyType>(key)

  const stateSuite = (props: P, children: TElementValue[], ctx: Context) => {
    const state = stateFactoryProto(props, children, ctx)
    portal.provide(state)
    return state
  }

  Object.assign(stateFactoryProto, { ...portal, suiteKey: stateSuite })
  Object.assign(stateSuite, { ...portal, suiteKey: stateSuite })

  return stateSuite as IStateFactory<P, S>
}

/**
 * 日常 组合式开发 应使用的 defineStateFactory
 * @param stateFactory
 * @param key
 * @returns
 */
export const defineStateFactory = <
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
