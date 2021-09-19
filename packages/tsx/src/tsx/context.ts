import {
  createContext,
  getCurrentContext,
  pushContext,
} from './context/content'
import { VComNode, VDomNode } from './context/type'

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

export function createAndPushContext<P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
) {
  const lastContext = getCurrentContext()

  const currentCtx = createContext(tag, props, lastContext)

  pushContext(currentCtx)

  return currentCtx
}
