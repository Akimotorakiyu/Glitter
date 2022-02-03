import { isFragmentElement, isStructElement } from '@glitter/core'
import { generateAndApplyReMounter } from './fragment/glitterFragment/generateAndApplyReMounter'

export const getGlitterNode = (element: TElementValue): IGlitterNode => {
  return isStructElement(element) ? getGlitterNode(element.render()) : element
}

export const getChildren = (childNodes: TElementValue[]): IGlitterNode[] => {
  const realchildNodes = childNodes.map((child) => {
    return getGlitterNode(child)
  })
  return realchildNodes
}

export const arrangeChildren = (
  parentElement: IGlitterNode,
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
  arrangeChildren(getGlitterNode(parentElement), childNodes)
}

export const replaceChildren = (
  parentElement: IGlitterNode,
  childNodes: IGlitterNode[],
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
  }, [] as IGlitterNode[])

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
