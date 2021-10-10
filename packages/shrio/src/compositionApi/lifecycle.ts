import { getCurrentContext } from '@shiro/create-element'

export const onCreated = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('created', fn)
}

export const onBeforeUpdated = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('beforeUpdated', fn)
}

export const onUpdated = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('updated', fn)
}

export const onDestory = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('destory', fn)
}

export const onInactive = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('inactive', fn)
}

export const onActive = (fn: () => void) => {
  const ctx = getCurrentContext()
  ctx.hub.addAction('active', fn)
}
