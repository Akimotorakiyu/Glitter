import { ShrioFragment } from '../fragment'
import { getCurrentContext } from './componentContext'

export function useSyncUpdater() {
  const ctx = getCurrentContext()
  return () => {
    const res = ctx.updater?.()
    if (res instanceof ShrioFragment) {
      res.reMount!(res)
    }
  }
}
