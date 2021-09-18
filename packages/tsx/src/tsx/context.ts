import { ContentNodeInfo, Context, VComNode, VDomNode } from './context/type'

let ctxStack: Context[] = []
let currentCtx: Context | null = null

export function getCurrentContext() {
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
  const lastContext = currentCtx
  if (lastContext) {
    ctxStack.push(lastContext)
  }

  currentCtx = createContext(tag, props, lastContext)

  return currentCtx
}

export function pushContext(context: Context) {
  const lastContext = currentCtx
  if (lastContext) {
    ctxStack.push(lastContext)
  }
  currentCtx = context
}

export function popContext() {
  currentCtx = ctxStack.pop() || null
}

const commonUpdater = <P>(comCtx: Context) => {
  pushContext(comCtx)
  comCtx.staticContentNodeInfo.domNodeInfo.current = 0
  comCtx.staticContentNodeInfo.comNodeInfo.current = 0
  const ele = comCtx.render()
  popContext()
  return ele
}

export function createContext<P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
) {
  const comCtx: Context = {
    tag,
    render: null as any,
    provider: Object.create(lastContext?.provider || null),
    onResize: [],
    isConnected: false,
    onConnected: [],
    onDisonnected: [],
    updater: () => {
      return commonUpdater(comCtx)
    },
    props: props as any,
    created: false,
    staticContentNodeInfo: {
      domNodeInfo: {
        current: 0,
        list: [],
      },
      comNodeInfo: {
        current: 0,
        list: [],
      },
    },
    dynamicContentNodeInfo: {
      map: new Map<string, ContentNodeInfo>(),
      index: '',
    },
    children: [],
  }
  return comCtx
}
