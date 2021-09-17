import { appendChildren } from '@shiro/create-element'

export const createFragment = (props: null, children: JSX.Element[]) => {
  const fragment = new DocumentFragment()

  appendChildren(fragment, children)

  return fragment
}
