import { isFragmentElement, isStructElement } from '@shrio/core'
import { generateAndApplyReMounter } from './fragment/shrioFragment/generateAndApplyReMounter'

export const getShrioNode = (element: TElementValue): IShrioNode => {
  return isStructElement(element) ? getShrioNode(element.render()) : element
}

export const getChildren = (childNodes: TElementValue[]): IShrioNode[] => {
  const realchildNodes = childNodes.map((child) => {
    return getShrioNode(child)
  })
  return realchildNodes
}

export const arrangeChildren = (
  parentElement: IShrioNode,
  childNodes: TElementValue[],
) => {
  const parent = parentElement
  const children = getChildren(childNodes)

  generateAndApplyReMounter(parent, children)
  replaceChildren(parent, children)
}

export const arrangeChildrenInner = (
  parentElement: TElementValue,
  childNodes: TElementValue[],
) => {
  arrangeChildren(getShrioNode(parentElement), childNodes)
}

export const replaceChildren = (
  parentElement: IShrioNode,
  childNodes: IShrioNode[],
) => {
  const flatedChildNodes = childNodes.reduce((acc, child) => {
    if (isFragmentElement(child)) {
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
