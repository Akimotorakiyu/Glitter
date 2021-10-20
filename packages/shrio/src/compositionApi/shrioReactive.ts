import { useAsyncUpdater, setUpdateMode } from '@shiro/create-element'
import { reactive, TKey } from '@shiro/reactive'
setUpdateMode('shallow')
export const shrioReactive = <T extends Record<TKey, any>>(target: T) => {
  return reactive(target, (t, k) => {
    const asyncUpdater = useAsyncUpdater()
    return asyncUpdater
  })
}
