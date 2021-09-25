import { getNode } from './tool'
import { generateAndApplyReMounter } from './generateAndApplyReMounter'
// 不应该给这个节点加子节点
export const emptyNode = new DocumentFragment()

export const flatenChildren = (children: unknown[]) => {
  const childNodes = children.flat(Infinity).map((child) => getNode(child))
  return childNodes
}

export const reRankChildren = (
  parentElement: Element | DocumentFragment,
  childNodes: Node[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)
  parentElement.replaceChildren(...childNodes)
}
