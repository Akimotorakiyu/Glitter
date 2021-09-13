export interface Context {
  provides: Record<KeyType, unknown>
  onResize: ((target: Element[]) => void)[]
  isConnected: boolean
  onConnected: ((target: Element[]) => void)[]
  onDisonnected: ((target: Element[]) => void)[]
  updater: () => JSX.Element
  props: any
  nodeInfo: {
    list: Node[]
    current: 0
    first: boolean
  }
}

let ctxStack: Context[] = []
let currentCtx: Context | null = null

export function getCurrentContext() {
  return currentCtx!
}

export function createAndPushContext<P>(props: P) {
  const lastContext = currentCtx
  if (lastContext) {
    ctxStack.push(lastContext)
  }

  currentCtx = createContext(props, lastContext)

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

export function createContext<P>(props: P, lastContext: Context | null) {
  const comCtx: Context = {
    provides: Object.create(lastContext?.provides || null),
    onResize: [],
    isConnected: false,
    onConnected: [],
    onDisonnected: [],
    updater: null as unknown as any,
    props,
    nodeInfo: {
      first: true,
      current: 0,
      list: [],
    },
  }
  return comCtx
}
