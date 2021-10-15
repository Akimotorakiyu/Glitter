import { ShrioFragment } from '../../fragment/shrioFragment/shrioFragment'
import { TContextHub } from './event/eventTarget'
export interface IElementStruct {
  render: () => TElementValue
}

export type TElementValue = IElementStruct | Node | number | string | boolean

export interface IFunctionComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: Node[], ctx: Context): TElementValue
}

export interface IFactoryComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: Node[], ctx: Context): IElementStruct
}

export type TCompontentType<P extends Record<string, unknown>> =
  | IFunctionComponent<P>
  | IFactoryComponent<P>

export interface Context {
  tag: IFunctionComponent<any> | IFactoryComponent<any>
  active: boolean
  provider: Record<string, unknown>
  parent: Context | null
  onResize: ((target: Element[]) => void)[]
  isConnected: boolean
  onConnected: ((target: Element[]) => void)[]
  onDisonnected: ((target: Element[]) => void)[]
  updater: () => Node
  render: () => Node
  syncUpdater: () => void
  asyncUpdater: () => Promise<void>
  props: Record<string, unknown>
  created: boolean
  staticContentNodeInfo: ContentNodeInfo
  childNodes: Node[]
  dynamicContentNodeInfo: {
    map: Map<string, ContentNodeInfo>
    keyStack: string[]
    depth: number
    markSet: Set<string>
  }
  hub: TContextHub
}

export interface VDomNode {
  node: Element | null
  props: Record<string, unknown>
}
export interface VComNode {
  node: Context | null
}
export interface VFragmentNode {
  node: ShrioFragment | null
  reloadChildren?: () => ShrioFragment
  reMount?: () => ShrioFragment
}

export interface ContentNodeInfo {
  isDynamic: boolean
  domNodeInfo: {
    list: VDomNode[]
    current: 0
  }
  comNodeInfo: {
    list: VComNode[]
    current: 0
  }
  fragmentNodeInfo: {
    list: VFragmentNode[]
    current: 0
  }
}
