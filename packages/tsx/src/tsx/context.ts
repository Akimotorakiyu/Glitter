import { createContextWithUpdater } from './context/createContext'
import { Context, VComNode, VDomNode } from './context/type'

const ctxStack: Context[] = []

export function getCurrentContext() {
  const currentCtx = ctxStack[ctxStack.length - 1]
  if (currentCtx) {
    return currentCtx
  } else {
    return createContext(() => '<This is fake root!>', null, null)
  }
}

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

  ctxStack.push(currentCtx)

  return currentCtx
}

export function pushContext(context: Context) {
  ctxStack.push(context)
}

export function popContext() {
  ctxStack.pop()
}

export function createContext<P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
) {
  const comCtx = createContextWithUpdater(tag, props, lastContext, ctxStack)
  return comCtx
}
