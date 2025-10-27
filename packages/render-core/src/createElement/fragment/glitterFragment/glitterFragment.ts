import {
  childNodesSymbol,
  IGlitterFragment,
  IGlitterNode,
  insertBeforeSymbol,
  markAsFragmentElement,
  removeSymbol,
} from '@glitter/core'

export class GlitterFragment implements IGlitterFragment {
  constructor() {
    markAsFragmentElement(this)
  }
  reMount: (glitterFragment?: IGlitterFragment | undefined) => void = () => {
    throw new Error('尚未 给 GlitterFragment reMount 赋值')
  }
  reloadChildren: () => void = () => {
    throw new Error('尚未 给 GlitterFragment reloadChildren 赋值')
  };
  [insertBeforeSymbol]<T extends IGlitterNode>(
    newNode: T,
    refChild: IGlitterNode | null,
  ): T {
    if (refChild) {
      const index = this[childNodesSymbol].findIndex((child) => {
        return child === refChild
      })

      this[childNodesSymbol].splice(index, 0, newNode)
    } else {
      this[childNodesSymbol].push(newNode)
    }

    return newNode
  }
  [childNodesSymbol]: IGlitterNode[] = [];
  [removeSymbol] = () => {
    throw new Error('GlitterFragment 尚未实现 remove')
  }
}
