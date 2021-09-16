import { appendChildren } from '@shiro/create-element'

export const Fragment = (props: null, children: JSX.Element[]) => {
  const fragment = new DocumentFragment()

  appendChildren(fragment, children)

  return fragment
}
