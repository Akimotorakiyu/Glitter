import { getCurrentContext } from './tsx/context'
export function useUpdater() {
  const ctx = getCurrentContext()
  return () => {
    ctx.updater?.()
    console.log('ctx.updater?.()')
  }
}
