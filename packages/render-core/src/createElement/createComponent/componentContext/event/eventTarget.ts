import { LifeCircle } from '@glitter/core'
import { createMessageCenter } from './event'

export const createContextHub = () => {
  const hub = createMessageCenter<LifeCircle>()
  return hub
}
