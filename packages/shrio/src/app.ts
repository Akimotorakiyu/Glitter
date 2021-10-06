import { getNode, arrangeChildren } from '@shiro/create-element'

export const mount = (root: HTMLElement, child: JSX.Element) => {
  arrangeChildren(root, [getNode(child)])
}
