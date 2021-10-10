import { createMessageCenter } from './event'

type LifeCircle = {
  created: []
  beforeUpdated: []
  updated: []
  destory: []
  inactive: []
  active: []
}

export const createContextHub = () => {
  const hub = createMessageCenter<LifeCircle>()
  return hub
}

export type TContextHub = ReturnType<typeof createContextHub>
