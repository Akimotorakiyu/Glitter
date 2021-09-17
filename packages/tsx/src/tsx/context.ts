export interface VDomNode {
  node: Element | null
}
export interface VComNode {
  node: Context | null
}
export interface Context {
  tag: JsxFunctionComponent<any> | JsxFactoryComponent<any>
  provider: Record<KeyType, unknown>
  onResize: ((target: Element[]) => void)[]
  isConnected: boolean
  onConnected: ((target: Element[]) => void)[]
  onDisonnected: ((target: Element[]) => void)[]
  updater: () => JSX.Element
  render: () => JSX.Element
  props: Record<string, unknown>
  created: boolean
  domNodeInfo: {
    list: VDomNode[]
    current: 0
  }
  comNodeInfo: {
    list: VComNode[]
    current: 0
  }

  children: JSX.Element[]
}

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
    parentCtx?.domNodeInfo.list.push(vDomNode)
  }

  const vDomNode = parentCtx.domNodeInfo.list[parentCtx?.domNodeInfo.current]!
  parentCtx!.domNodeInfo.current++

  return vDomNode
}

export const getCurrentVComNode = () => {
  const parentCtx = getCurrentContext()

  if (!parentCtx.created) {
    const vComNode = <VComNode>{
      node: null,
    }
    parentCtx.comNodeInfo.list.push(vComNode)
  }

  const vComNode = parentCtx.comNodeInfo.list[parentCtx.comNodeInfo.current]
  parentCtx!.comNodeInfo.current++
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
  comCtx.domNodeInfo.current = 0
  comCtx.comNodeInfo.current = 0
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
    domNodeInfo: {
      current: 0,
      list: [],
    },
    comNodeInfo: {
      current: 0,
      list: [],
    },
    children: [],
  }
  return comCtx
}
