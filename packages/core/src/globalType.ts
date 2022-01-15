interface IShrioNode {
  insertBefore<T extends IShrioNode>(newNode: T, refChild: IShrioNode | null): T
  childNodes: IShrioNode[]
  remove: () => void
}

interface IShrioFragment extends IShrioNode {
  reMount: (shrioFragment?: IShrioFragment) => void
  reloadChildren: () => void
}

interface IElementStruct {
  render: () => TElementValue
}

type TElementValue = IShrioNode | IElementStruct
