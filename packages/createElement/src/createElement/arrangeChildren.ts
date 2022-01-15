import { generateAndApplyReMounter } from './fragment/shrioFragment/generateAndApplyReMounter'
import { ShrioFragment } from './fragment/shrioFragment/shrioFragment'

function isElementStruct(node: TElementValue): node is IElementStruct {
  return 'render' in node && typeof node.render === 'function' ? true : false
}

export const getShrioNode = (element: TElementValue): IShrioNode => {
  return isElementStruct(element) ? getShrioNode(element.render()) : element
}

export const getChildren = (childNodes: TElementValue[]): IShrioNode[] => {
  const realchildNodes = childNodes.map((child) => {
    return getShrioNode(child)
  })
  return realchildNodes
}

export const arrangeChildren = (
  parentElement: TElementValue,
  childNodes: TElementValue[],
) => {
  const parent = getShrioNode(parentElement)
  const children = getChildren(childNodes)

  generateAndApplyReMounter(parent, children)
  replaceChildren(parent, children)
}

export const replaceChildren = (
  parentElement: IShrioNode,
  childNodes: IShrioNode[],
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
  }, [] as IShrioNode[])

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
