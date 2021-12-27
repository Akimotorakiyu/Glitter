export interface IShrioFragment {
  reMount: ((shrioFragment?: ShrioFragment) => void) | null
  reloadChildren: (() => ShrioFragment) | null
  insertBefore<T extends Node>(newNode: T, refChild: Node | null): T
  childNodes: ChildNode[]
}

export class ShrioFragment implements IShrioFragment {
  reMount: ((shrioFragment?: ShrioFragment) => void) | null = null
  reloadChildren: (() => ShrioFragment) | null = null
  insertBefore<T extends Node>(newNode: T, refChild: Node | null) {
    if (refChild) {
      const index = this.childNodes.findIndex((child) => {
        return child === refChild
      })

      this.childNodes.splice(index, 0, newNode as unknown as ChildNode)
    } else {
      this.childNodes.push(newNode as unknown as ChildNode)
    }

    return newNode
  }

  childNodes: ChildNode[] = []
}
