import { getCurrentContext } from './content'
import { VComNode, VDomNode } from './type'

const getContentNodeInfo = () => {
  const parentCtx = getCurrentContext()
  if (parentCtx.dynamicContentNodeInfo.depth) {
    if (
      parentCtx.dynamicContentNodeInfo.keyStack.length !==
      parentCtx.dynamicContentNodeInfo.depth
    ) {
      throw 'please setkey for dynamic render!'
    } else {
      const info = parentCtx.dynamicContentNodeInfo.map.get(
        parentCtx.dynamicContentNodeInfo.keyStack[
          parentCtx.dynamicContentNodeInfo.depth - 1
        ],
      )

      return info!
    }
  }
  return parentCtx.staticContentNodeInfo
}

export const getCurrentVDomNode = () => {
  const parentCtx = getCurrentContext()

  const contentNodeInfo = getContentNodeInfo()

  if (contentNodeInfo.isDynamic) {
    if (
      !contentNodeInfo.comNodeInfo.list[contentNodeInfo.comNodeInfo.current]
    ) {
      const vDomNode = <VDomNode>{
        node: null,
      }
      contentNodeInfo.domNodeInfo.list.push(vDomNode)
    }
  }

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

  if (contentNodeInfo.isDynamic) {
    if (
      !contentNodeInfo.comNodeInfo.list[contentNodeInfo.comNodeInfo.current]
    ) {
      const vComNode = <VComNode>{
        node: null,
      }
      contentNodeInfo.comNodeInfo.list.push(vComNode)
    }
  }

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
