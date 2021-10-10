import { createMessageCenter, MessageCenter } from './event'

export type LifeCircle = {
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

export type TContextHub = MessageCenter<LifeCircle>
