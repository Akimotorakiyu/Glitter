import { getCurrentContext } from './tsx/context/content'

export function useUpdater() {
  const ctx = getCurrentContext()
  return () => {
    ctx.updater?.()
  }
}
