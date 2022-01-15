import { getCurrentContext } from './content'

export const setKey = (key: string) => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.keyStack.push(key)
  parentCtx.dynamicContentNodeInfo.markSet.delete(key)
  if (!parentCtx.dynamicContentNodeInfo.map.has(key)) {
    parentCtx.dynamicContentNodeInfo.map.set(key, {
      isDynamic: true,
      domNodeInfo: {
        current: 0,
        list: [],
      },
      comNodeInfo: {
        current: 0,
        list: [],
      },
      fragmentNodeInfo: {
        list: [],
        current: 0,
      },
    })
  }
}
