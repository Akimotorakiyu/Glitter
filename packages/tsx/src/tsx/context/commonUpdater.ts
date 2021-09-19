import { Context } from './type'

export const commonUpdater = <P>(contextStack: Context[], comCtx: Context) => {
  contextStack.push(comCtx)

  comCtx.staticContentNodeInfo.domNodeInfo.current = 0
  comCtx.staticContentNodeInfo.comNodeInfo.current = 0
  const ele = comCtx.render()

  contextStack.pop()

  return ele
}
