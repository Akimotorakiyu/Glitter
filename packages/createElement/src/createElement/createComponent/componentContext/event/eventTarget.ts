import { createMessageCenter } from './event'

type LifeCircle = {
  mounted: []
  created: []
  beforeUpdated: []
  Updated: []
  beforeDestory: []
  destoryed: []
}

export const createContextHub = () => {
  const hub = createMessageCenter<LifeCircle>()
  return hub
}

export type TContextHub = ReturnType<typeof createContextHub>
