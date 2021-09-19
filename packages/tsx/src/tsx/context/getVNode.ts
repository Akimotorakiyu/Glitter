import { getCurrentContext } from './content'
import { VComNode, VDomNode } from './type'

export const getCurrentVDomNode = () => {
  const parentCtx = getCurrentContext()

  if (!parentCtx.created) {
    const vDomNode = <VDomNode>{
      node: null,
    }
    parentCtx.staticContentNodeInfo.domNodeInfo.list.push(vDomNode)
  }

  const vDomNode =
    parentCtx.staticContentNodeInfo.domNodeInfo.list[
      parentCtx.staticContentNodeInfo.domNodeInfo.current
    ]!
  parentCtx.staticContentNodeInfo.domNodeInfo.current++

  return vDomNode
}

export const getCurrentVComNode = () => {
  const parentCtx = getCurrentContext()

  if (!parentCtx.created) {
    const vComNode = <VComNode>{
      node: null,
    }
    parentCtx.staticContentNodeInfo.comNodeInfo.list.push(vComNode)
  }

  const vComNode =
    parentCtx.staticContentNodeInfo.comNodeInfo.list[
      parentCtx.staticContentNodeInfo.comNodeInfo.current
    ]
  parentCtx.staticContentNodeInfo.comNodeInfo.current++
  return vComNode
}
