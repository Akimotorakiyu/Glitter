import { getNode } from './createIntrinsicElement/util'

export const flatenChildren = (children: unknown[]) => {
  const childNodes = children.flat(Infinity).map((child) => getNode(child))
  return childNodes
}
