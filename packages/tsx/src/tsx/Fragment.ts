import { getNode } from '@shiro/create-element'

export const Fragment = (props: null, children: JSX.Element[]) => {
  const fragment = new DocumentFragment()
  children
    .flat(Infinity)
    .map((child) => getNode(child))
    .forEach((child) => {
      fragment.appendChild(child)
    })
  return fragment
}
