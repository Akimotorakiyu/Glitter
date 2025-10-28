export const removeSymbol = Symbol('remove')
export const insertBeforeSymbol = Symbol('insertBefore')
export const childNodesSymbol = Symbol('childNodes')

/**
 * Common Node Interface
 */
export interface IGlitterNode {
  [insertBeforeSymbol]<T extends IGlitterNode>(
    newNode: T,
    refChild: IGlitterNode | null,
  ): T
  [childNodesSymbol]: IGlitterNode[]
  [removeSymbol]: () => void
}

/**
 * Text Node Interface
 * insertBefore and remove will do nothing on text node, until you customize it.
 * key is used for identifying the text node, you should set it when you insert and create text nodes dynamically.
 */
export interface IGlitterTextNode extends IGlitterNode {
  value: string
  key?: unknown
}

export interface IGlitterFragment extends IGlitterNode {
  reMount: (glitterFragment?: IGlitterFragment) => void
  reloadChildren: () => void
}

export interface IElementStruct {
  render: () => TElementValue
}

export type TElementValue = IGlitterNode | IElementStruct

export interface IIntrinsicComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: TElementValue[], ctx: Context): TElementValue
}
export interface IFunctionComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: TElementValue[], ctx: Context): TElementValue
}

export interface IFactoryComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: TElementValue[], ctx: Context): IElementStruct
}

export type TCompontentType<P extends Record<string, unknown>> =
  | IIntrinsicComponent<P>
  | IFunctionComponent<P>
  | IFactoryComponent<P>

/**
 *
 */

export type Listenner<
  E extends string | number | symbol,
  Args extends unknown[],
> = (event: E, ...args: Args) => void | Promise<void>

export interface MessageProtcol {
  [props: string]: unknown[]
}

export interface MessageCenter<Protcol extends MessageProtcol> {
  removeAction: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => void
  addAction: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => void
  dispatch: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    ...args: Args
  ) => (void | Promise<void>)[]
}

export type LifeCircle = {
  created: []
  beforeUpdated: []
  updated: []
  destory: []
  inactive: []
  active: []
}

export type TContextHub = MessageCenter<LifeCircle>

/**
 *
 */

export interface Context {
  tag: IFunctionComponent<any> | IFactoryComponent<any>
  element: TElementValue | null
  active: boolean
  provider: Record<string, unknown>
  parent: Context | null
  onResize: ((target: Element[]) => void)[]
  isConnected: boolean
  onConnected: ((target: Element[]) => void)[]
  onDisonnected: ((target: Element[]) => void)[]
  updater: () => TElementValue
  render: () => TElementValue
  syncUpdater: () => void
  asyncUpdater: () => Promise<void>
  props: Record<string, unknown>
  created: boolean
  staticContentNodeInfo: ContentNodeInfo
  childNodes: TElementValue[]
  dynamicContentNodeInfo: {
    map: Map<string, ContentNodeInfo>
    keyStack: string[]
    depth: number
    markSet: Set<string>
  }
  hub: TContextHub
  contains: (ctx: Context) => boolean
}

export interface VDomNode {
  node: IGlitterNode | null
  props: Record<string, any>
}
export interface VComNode {
  node: Context | null
}
export interface VFragmentNode {
  node: IGlitterFragment | null
  reloadChildren?: () => IGlitterFragment
  reMount?: () => IGlitterFragment
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
