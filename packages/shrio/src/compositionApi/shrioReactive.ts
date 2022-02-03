import { useAsyncUpdater, setUpdateMode } from '@glitter/render-core'
import { reactive, TKey } from '@glitter/reactive'
setUpdateMode('shallow')
export const shrioReactive = <T extends Record<TKey, any>>(target: T) => {
  return reactive(target, (t, k) => {
    const asyncUpdater = useAsyncUpdater()
    return asyncUpdater
  })
}
