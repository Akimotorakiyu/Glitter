import { appendChildren } from '@shiro/create-element'
import { getCurrentVFragmentNode } from './context'
export const createFragment = (props: null, children: JSX.Element[]) => {
  const fragment = new DocumentFragment()

  const vFragmentNode = getCurrentVFragmentNode()

  if (!vFragmentNode.node) {
    vFragmentNode.node = new DocumentFragment()
  } else {
  }

  appendChildren(fragment, children)

  return fragment
}
