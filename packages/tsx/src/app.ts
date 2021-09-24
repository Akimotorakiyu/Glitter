import { replaceChildren } from '@shiro/create-element'

export const mount = (root: HTMLElement, child: JSX.Element) => {
  replaceChildren(root, [child])
}
