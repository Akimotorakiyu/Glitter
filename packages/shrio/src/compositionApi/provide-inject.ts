import { getCurrentContext } from '@shiro/create-element'

export type KeyType = number | symbol | string

export function provide<T>(key: KeyType, data: T) {
  const ctx = getCurrentContext()
  return Reflect.set(ctx.provider, key, data)
}

export function inject<T>(key: KeyType): T {
  const ctx = getCurrentContext()
  return Reflect.get(ctx.provider, key) as T
}

export function definePortal<D, K extends KeyType = symbol>(key?: K) {
  const _key = key || Symbol()
  return {
    provide(data: D) {
      provide(_key, data)
    },
    inject() {
      return inject(_key) as D
    },
  }
}
