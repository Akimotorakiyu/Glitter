import { appendChildren, ShrioFragment } from '@shiro/create-element'
import { getCurrentVFragmentNode } from './context'
export const createFragment = (props: null, children: JSX.Element[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new ShrioFragment()
  }

  const shrioFragmentChildrenNodes = children.filter(
    (child) => child instanceof ShrioFragment,
  ) as ShrioFragment[]

  vFragmentNode.node.reloadChildren = () => {
    shrioFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    appendChildren(vFragmentNode.node!, children)
    return vFragmentNode.node!
  }

  appendChildren(vFragmentNode.node, children)

  return vFragmentNode.node
}
