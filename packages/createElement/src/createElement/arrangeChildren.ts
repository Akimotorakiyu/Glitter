import { generateAndApplyReMounter } from './fragment/shrioFragment/generateAndApplyReMounter'
import { ShrioFragment } from './fragment/shrioFragment/shrioFragment'

export const arrangeChildren = (
  parentElement: Node | ShrioFragment,
  childNodes: (Node | ShrioFragment)[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)

  replaceChildren(parentElement, childNodes)
}

export const replaceChildren = (
  parentElement: Node | ShrioFragment,
  childNodes: (Node | ShrioFragment)[],
) => {
  const flatedChildNodes = childNodes.reduce((acc, child) => {
    if (child instanceof ShrioFragment) {
      const concated = acc.concat(...child.childNodes)
      child.childNodes.length = 0
      return concated
    } else {
      acc.push(child)
    }
    return acc
  }, [] as Node[])

  const childNodesSet = new Set(flatedChildNodes)

  for (let index = 0; parentElement.childNodes[index]; index++) {
    const element = parentElement.childNodes[index]
    if (!childNodesSet.has(element)) {
      element.remove()
    }
  }

  flatedChildNodes.forEach((child, index) => {
    const nIndexChildInParent = parentElement.childNodes[index]
    if (!(nIndexChildInParent === child)) {
      parentElement.insertBefore(child, nIndexChildInParent)
    }
  })
}
