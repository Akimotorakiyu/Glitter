import { getCurrentContext } from './tsx/context/content'
import { ShrioFragment } from '@shiro/create-element'
export function useUpdater() {
  const ctx = getCurrentContext()
  return () => {
    const res = ctx.updater?.()
    if (res instanceof ShrioFragment) {
      res.reMount!()
    }
  }
}
