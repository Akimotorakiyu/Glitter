export interface Context {
  tag: JsxFunctionComponent<any> | JsxFactoryComponent<any>
  provider: Record<KeyType, unknown>
  onResize: ((target: Element[]) => void)[]
  isConnected: boolean
  onConnected: ((target: Element[]) => void)[]
  onDisonnected: ((target: Element[]) => void)[]
  updater: () => JSX.Element
  render: () => JSX.Element
  props: any
  nodeInfo: {
    list: Node[]
    current: 0
    first: boolean
  }
  children: JSX.Element[]
}

let ctxStack: Context[] = []
let currentCtx: Context | null = null

export function getCurrentContext() {
  return currentCtx!
}

export function createAndPushContext<P>(
  tag: JsxFunctionComponent<any> | JsxFactoryComponent<any>,
) {
  const lastContext = currentCtx
  if (lastContext) {
    ctxStack.push(lastContext)
  }

  currentCtx = createContext(tag, lastContext)

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
  comCtx.nodeInfo.current = 0
  const ele = comCtx.render()
  popContext()
  return ele
}

export function createContext<P>(
  tag: JsxFunctionComponent<any> | JsxFactoryComponent<any>,
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
    props: null,
    nodeInfo: {
      first: true,
      current: 0,
      list: [],
    },
    children: [],
  }
  return comCtx
}
