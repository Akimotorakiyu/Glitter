import { getCurrentContext } from '@shiro/render-core'

const hubHelper = <E extends keyof LifeCircle>(
  hub: TContextHub,
  event: E,
  fn: (...args: LifeCircle[E]) => void,
  once: boolean,
) => {
  if (once) {
    const runner = (...args: LifeCircle[E]) => {
      hub.removeAction(event, runner as any)
      fn(...args)
    }
    hub.addAction(event, runner as any)
  } else {
    hub.addAction(event, fn as any)
  }
}

const lifecycleHelper = <
  E extends keyof LifeCircle,
  C extends keyof LifeCircle,
>(
  event: E,
  cleanEvent: C,
  fn: (...args: any[]) => void | (() => void),
  once: boolean,
) => {
  const ctx = getCurrentContext()

  hubHelper(
    ctx.hub,
    event,
    (...args) => {
      const cleaner = fn(...args)
      if (cleaner) {
        hubHelper(ctx.hub, cleanEvent, cleaner, true)
      }
    },
    once,
  )
}

export const onCreated = (fn: () => void | (() => void)) => {
  lifecycleHelper('created', 'destory', fn, true)
}

export const onDestory = (fn: () => void) => {
  lifecycleHelper('destory', 'created', fn, true)
}

export const onBeforeUpdated = (
  fn: () => void | (() => void),
  once: boolean = false,
) => {
  lifecycleHelper('beforeUpdated', 'updated', fn, once)
}

export const onUpdated = (fn: () => void, once: boolean = false) => {
  lifecycleHelper('updated', 'beforeUpdated', fn, once)
}

export const onInactive = (
  fn: () => void | (() => void),
  once: boolean = false,
) => {
  lifecycleHelper('inactive', 'active', fn, once)
}

export const onActive = (fn: () => void, once: boolean = false) => {
  lifecycleHelper('active', 'inactive', fn, once)
}
