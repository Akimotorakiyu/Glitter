import { markAsFragmentElement } from '@glitter/core'

export class GlitterFragment implements IGlitterFragment {
  constructor() {
    markAsFragmentElement(this)
  }
  reMount: (glitterFragment?: IGlitterFragment | undefined) => void = () => {
    throw new Error('尚未 给 GlitterFragment reMount 赋值')
  }
  reloadChildren: () => void = () => {
    throw new Error('尚未 给 GlitterFragment reloadChildren 赋值')
  }
  insertBefore<T extends IGlitterNode>(
    newNode: T,
    refChild: IGlitterNode | null,
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
  childNodes: IGlitterNode[] = []
  remove: () => void = () => {
    throw new Error('GlitterFragment 尚未实现 remove')
  }
}
