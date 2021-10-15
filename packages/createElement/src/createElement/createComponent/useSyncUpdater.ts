import { getCurrentContext } from './componentContext'

export function useSyncUpdater() {
  const ctx = getCurrentContext()
  return ctx.syncUpdater
}

export const useAsyncUpdater = () => {
  const ctx = getCurrentContext()

  return ctx.asyncUpdater
}
