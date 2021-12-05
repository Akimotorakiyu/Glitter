import { getCurrentContext } from './componentContext'

export type KeyType = number | symbol | string

export function provide<T>(key: KeyType, data: T) {
  const ctx = getCurrentContext()
  return Reflect.set(ctx.provider, key, data)
}

export function inject<T>(key: KeyType): T {
  const ctx = getCurrentContext()
  return Reflect.get(ctx.provider, key) as T
}

export interface IPortal<D> {
  provide(data: D): void
  inject(): D
  key: KeyType
}

export function definePortal<D, K extends KeyType = symbol>(
  key?: K,
): IPortal<D> {
  const _key = key || Symbol()
  return {
    provide(data: D) {
      provide(_key, data)
    },
    inject() {
      return inject(_key) as D
    },
    get key() {
      return _key
    },
  }
}
