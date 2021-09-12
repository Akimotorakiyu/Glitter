import { getCurrentCtx } from './tsx'

export function useUpdater() {
  const ctx = getCurrentCtx()
  return () => {
    ctx.updater?.()
  }
}
