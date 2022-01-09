interface IShrioNode {
  insertBefore<T extends Node>(newNode: T, refChild: Node | null): T
  childNodes: ChildNode[]
}

interface IShrioFragment extends IShrioNode {
  reMount: ((shrioFragment?: IShrioFragment) => void) | null
  reloadChildren: (() => IShrioFragment) | null
}
