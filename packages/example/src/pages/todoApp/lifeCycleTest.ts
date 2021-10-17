import {
  onActive,
  onBeforeUpdated,
  onCreated,
  onDestory,
  onInactive,
  onUpdated,
} from '@shrio/shrio'

export const lifeCycleTest = () => {
  onCreated(() => {
    console.log('onCreated')

    return () => {
      console.log('clean onCreated')
    }
  })

  onDestory(() => {
    console.log('onDestory')
  })

  onInactive(() => {
    console.log('onInactive')

    return () => {
      console.log('clean onActive')
    }
  })

  onActive(() => {
    console.log('onActive')
  })

  onBeforeUpdated(() => {
    console.log('onBeforeUpdated')
    return () => {
      console.log('clean onBeforeUpdated')
    }
  })

  onUpdated(() => {
    console.log('onUpdated')
  })
}
