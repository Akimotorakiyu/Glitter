import { emptyNode } from '../emptyNode'
import { FakeRootComponent } from './rootComponent'

export const commonUpdater = (contextStack: Context[], comCtx: Context) => {
  if (comCtx.tag === FakeRootComponent) {
    return emptyNode
  }

  contextStack.push(comCtx)

  comCtx.staticContentNodeInfo.domNodeInfo.current = 0
  comCtx.staticContentNodeInfo.comNodeInfo.current = 0
  comCtx.staticContentNodeInfo.fragmentNodeInfo.current = 0

  comCtx.dynamicContentNodeInfo.markSet.clear()

  comCtx.dynamicContentNodeInfo.map.forEach((contentNodeInfo, key) => {
    contentNodeInfo.comNodeInfo.current = 0
    contentNodeInfo.domNodeInfo.current = 0
    contentNodeInfo.fragmentNodeInfo.current = 0

    comCtx.dynamicContentNodeInfo.markSet.add(key)
  })

  const ele = comCtx.render()

  comCtx.dynamicContentNodeInfo.markSet.forEach((key) => {
    comCtx.dynamicContentNodeInfo.map.delete(key)
  })

  contextStack.pop()

  return ele
}
