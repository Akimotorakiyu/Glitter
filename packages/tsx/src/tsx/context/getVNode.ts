import { getCurrentContext } from './content'
import { VComNode, VDomNode } from './type'

const getContentNodeInfo = () => {
  const parentCtx = getCurrentContext()
  return parentCtx.staticContentNodeInfo
}

export const getCurrentVDomNode = () => {
  const parentCtx = getCurrentContext()

  const contentNodeInfo = getContentNodeInfo()

  if (!parentCtx.created) {
    const vDomNode = <VDomNode>{
      node: null,
    }
    contentNodeInfo.domNodeInfo.list.push(vDomNode)
  }

  const vDomNode =
    contentNodeInfo.domNodeInfo.list[contentNodeInfo.domNodeInfo.current]!
  contentNodeInfo.domNodeInfo.current++

  return vDomNode
}

export const getCurrentVComNode = () => {
  const parentCtx = getCurrentContext()

  const contentNodeInfo = getContentNodeInfo()

  if (!parentCtx.created) {
    const vComNode = <VComNode>{
      node: null,
    }
    contentNodeInfo.comNodeInfo.list.push(vComNode)
  }

  const vComNode =
    contentNodeInfo.comNodeInfo.list[contentNodeInfo.comNodeInfo.current]
  contentNodeInfo.comNodeInfo.current++
  return vComNode
}
