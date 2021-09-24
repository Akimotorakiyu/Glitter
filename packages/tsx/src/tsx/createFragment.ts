import {
  replaceChildren,
  ShrioFragment,
  flatenChildren,
} from '@shiro/create-element'
import { getCurrentVFragmentNode } from './context'
export const createFragment = (props: null, children: JSX.Element[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new ShrioFragment()
  }

  const shrioFragmentChildrenNodes = flatenChildren(children).filter(
    (child) => child instanceof ShrioFragment,
  ) as ShrioFragment[]

  vFragmentNode.node.reloadChildren = () => {
    shrioFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    replaceChildren(vFragmentNode.node!, children)
    return vFragmentNode.node!
  }

  replaceChildren(vFragmentNode.node, children)

  return vFragmentNode.node
}
