import { definePortal, IPortal, KeyType, _provide } from '@glitter/render-core'

import { IComponentStateFactoryProto } from './type'

const suiteKey = Symbol('suiteKey')

export type IStateFactory<
  P extends Record<string, any>,
  S extends Record<string, any>,
> = IComponentStateFactoryProto<P, S> & IPortal<S>

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
): ((...args: Args) => S) & IPortal<S> => {
  if (Reflect.get(stateFactory, suiteKey)) {
    return stateFactory as ((...args: Args) => S) & IPortal<S>
  }

  const portal = definePortal<S, KeyType>(key)

  const stateSuite = (...args: Args) => {
    const state = stateFactory(...args)
    portal.provide(state)
    return state
  }

  Object.assign(stateFactory, { ...portal, suiteKey: stateSuite })
  Object.assign(stateSuite, { ...portal, suiteKey: stateSuite })

  return stateSuite as ((...args: Args) => S) & IPortal<S>
}

/**
 * 仅为工厂组件使用的
 * @param stateFactoryProto
 * @param key
 * @returns
 */
export function defineFactoryComponentStateFactory<
  P extends Record<string, any>,
  S extends Record<string, any>,
>(
  stateFactoryProto: IComponentStateFactoryProto<P, S>,
  key?: KeyType,
): IStateFactory<P, S> {
  const s = defineStateFactory<[P, TElementValue[], Context], S>(
    (p, children, ctx) => {
      return stateFactoryProto(p, children, ctx)
    },
    key,
  )
  return s
}
