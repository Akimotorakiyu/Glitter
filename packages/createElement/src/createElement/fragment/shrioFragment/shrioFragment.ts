import { markAsFragmentElement } from '@shrio/core'

export class ShrioFragment implements IShrioFragment {
  constructor() {
    markAsFragmentElement(this)
  }
  reMount: (shrioFragment?: IShrioFragment | undefined) => void = () => {
    throw new Error('尚未 给 ShrioFragment reMount 赋值')
  }
  reloadChildren: () => void = () => {
    throw new Error('尚未 给 ShrioFragment reloadChildren 赋值')
  }
  insertBefore<T extends IShrioNode>(
    newNode: T,
    refChild: IShrioNode | null,
  ): T {
    if (refChild) {
      const index = this.childNodes.findIndex((child) => {
        return child === refChild
      })

      this.childNodes.splice(index, 0, newNode)
    } else {
      this.childNodes.push(newNode)
    }

    return newNode
  }
  childNodes: IShrioNode[] = []
  remove: () => void = () => {
    throw new Error('ShrioFragment 尚未实现 remove')
  }
}
