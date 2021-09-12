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
