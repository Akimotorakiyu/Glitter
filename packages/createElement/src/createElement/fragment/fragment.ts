import { arrangeChildren } from '../arrangeChildren'
import { getCurrentVFragmentNode } from '../createComponent/componentContext'
import { ShrioFragment } from './shrioFragment/shrioFragment'
export const Fragment = (props: null, childNodes: (Node | ShrioFragment)[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new ShrioFragment()
  }

  const shrioFragmentChildrenNodes = childNodes.filter(
    (child) => child instanceof ShrioFragment,
  ) as unknown[] as ShrioFragment[]

  vFragmentNode.node.reloadChildren = () => {
    shrioFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    arrangeChildren(vFragmentNode.node!, childNodes)
    return vFragmentNode.node as unknown as any
  }

  arrangeChildren(vFragmentNode.node, childNodes)

  return vFragmentNode.node
}
