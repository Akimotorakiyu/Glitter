interface IGlitterNode {
  insertBefore<T extends IGlitterNode>(
    newNode: T,
    refChild: IGlitterNode | null,
  ): T
  childNodes: IGlitterNode[]
  remove: () => void
}

interface IGlitterFragment extends IGlitterNode {
  reMount: (glitterFragment?: IGlitterFragment) => void
  reloadChildren: () => void
}

interface IElementStruct {
  render: () => TElementValue
}

type TElementValue = IGlitterNode | IElementStruct

interface IFunctionComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: TElementValue[], ctx: Context): TElementValue
}

interface IFactoryComponent<P extends Record<string, unknown> = {}> {
  (props: P, children: TElementValue[], ctx: Context): IElementStruct
}

type TCompontentType<P extends Record<string, unknown>> =
  | IFunctionComponent<P>
  | IFactoryComponent<P>

/**
 *
 */

type Listenner<E extends string | number | symbol, Args extends unknown[]> = (
  event: E,
  ...args: Args
) => void | Promise<void>

interface MessageProtcol {
  [props: string]: unknown[]
}

interface MessageCenter<Protcol extends MessageProtcol> {
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

type LifeCircle = {
  created: []
  beforeUpdated: []
  updated: []
  destory: []
  inactive: []
  active: []
}

type TContextHub = MessageCenter<LifeCircle>

/**
 *
 */

interface Context {
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

interface VDomNode {
  node: IGlitterNode | null
  props: Record<string, unknown>
}
interface VComNode {
  node: Context | null
}
interface VFragmentNode {
  node: IGlitterFragment | null
  reloadChildren?: () => IGlitterFragment
  reMount?: () => IGlitterFragment
}

interface ContentNodeInfo {
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
