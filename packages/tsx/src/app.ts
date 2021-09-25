import { getNode, reRankChildren } from '@shiro/create-element'

export const mount = (root: HTMLElement, child: JSX.Element) => {
  reRankChildren(root, [getNode(child)])
}
