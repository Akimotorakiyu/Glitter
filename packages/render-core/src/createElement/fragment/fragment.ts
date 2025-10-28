import { TElementValue } from '@glitter/core'
import { arrangeChildrenInner } from '../arrangeChildren'
import { getCurrentVFragmentNode } from '../createComponent/componentContext'
import { GlitterFragment } from './glitterFragment/glitterFragment'
export const Fragment = (props: null, childNodes: TElementValue[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new GlitterFragment()
  }

  const glitterFragmentChildrenNodes = childNodes.filter(
    (child) => child instanceof GlitterFragment,
  ) as unknown[] as GlitterFragment[]

  vFragmentNode.node.reloadChildren = () => {
    glitterFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    arrangeChildrenInner(vFragmentNode.node!, childNodes)
    return vFragmentNode.node as unknown as any
  }

  arrangeChildrenInner(vFragmentNode.node, childNodes)

  return vFragmentNode.node
}
