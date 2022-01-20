import { createMessageCenter, MessageCenter } from './event'

export const createContextHub = () => {
  const hub = createMessageCenter<LifeCircle>()
  return hub
}
