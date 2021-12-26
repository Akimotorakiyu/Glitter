import { generateAndApplyReMounter } from './fragment/shrioFragment/generateAndApplyReMounter'
import { ShrioFragment } from './fragment/shrioFragment/shrioFragment'

export const arrangeChildren = (
  parentElement: Element | ShrioFragment,
  childNodes: Node[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)

  const flatedChildNodes = childNodes.reduce((acc, child) => {
    if (child instanceof DocumentFragment) {
      return acc.concat(...child.childNodes)
    } else {
      acc.push(child)
    }
    return acc
  }, [] as Node[])

  const childNodesSet = new Set(flatedChildNodes)

  for (let index = 0; parentElement.childNodes.item(index); index++) {
    const element = parentElement.childNodes.item(index)
    if (!childNodesSet.has(element)) {
      element.remove()
    }
  }

  flatedChildNodes.forEach((child, index) => {
    const nIndexChildInParent = parentElement.childNodes.item(index)
    if (!(nIndexChildInParent === child)) {
      parentElement.insertBefore(child, nIndexChildInParent)
    }
  })
}
