export type TKey = string | symbol

export function isObject(value: unknown): value is Record<TKey, any> {
  return value !== null && typeof value === 'object'
}

const reactiveAttrKey = Symbol()

export const reactiveFrame = <T extends Record<TKey, any>>(
  target: T,
  track: (target: T, key: TKey) => void,
  trigger: (target: T, key: TKey, newValue: any, oldValue: any) => void,
): T => {
  const _ob = Reflect.get(target, reactiveAttrKey)

  if (_ob) {
    return _ob as T
  }

  const observer = new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      // 防止递归
      if (key === reactiveAttrKey) {
        return value
      }

      track(target, key)
      return isObject(value)
        ? reactiveFrame(value as any, track, trigger)
        : value
    },
    set(target, key, newValue, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      const result = Reflect.set(target, key, newValue, receiver)
      // 防止 trigger
      if (key === reactiveAttrKey) {
        return result
      }
      trigger(target, key, newValue, oldValue)
      return result
    },
  })

  Reflect.set(target, reactiveAttrKey, observer)
  return observer
}

const reactiveKey = Symbol('reactiveKey')

export const reactive = <T extends Record<TKey, any>>(
  target: T,
  getCall: (target: T, key: TKey) => (() => void) | undefined,
) => {
  return reactiveFrame(
    target,
    (target, key) => {
      let reactiveMap = Reflect.get(target, reactiveKey) as Map<
        TKey,
        Set<() => void>
      >
      if (!reactiveMap) {
        reactiveMap = new Map()
        Reflect.set(target, reactiveKey, reactiveMap)
      }

      let callSet = reactiveMap.get(key)

      if (!callSet) {
        callSet = new Set()
        reactiveMap.set(key, callSet)
      }
      const call = getCall(target, key)
      if (call) {
        callSet.add(call)
      }
    },
    (target, key, newValue, oldValue) => {
      let reactiveMap = Reflect.get(target, reactiveKey) as Map<
        TKey,
        Set<() => void>
      >

      const set = reactiveMap?.get(key)
      reactiveMap?.delete(key)
      set?.forEach((fn) => fn())
    },
  )
}
