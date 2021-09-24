import { replaceChildren, ShrioFragment } from '@shiro/create-element'
import { getCurrentVFragmentNode } from './context'
export const createFragment = (props: null, childNodes: Node[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new ShrioFragment()
  }

  const shrioFragmentChildrenNodes = childNodes.filter(
    (child) => child instanceof ShrioFragment,
  ) as ShrioFragment[]

  vFragmentNode.node.reloadChildren = () => {
    shrioFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    replaceChildren(vFragmentNode.node!, childNodes)
    return vFragmentNode.node!
  }

  replaceChildren(vFragmentNode.node, childNodes)

  return vFragmentNode.node
}
