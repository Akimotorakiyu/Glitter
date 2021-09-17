import { appendChildren } from '@shiro/create-element'
import { createComponent } from './createComponent'
export const dynamic = (dynamicRender: () => JSX.Element[] | JSX.Element) => {
  const com = createComponent(
    () => {
      const fragment = new DocumentFragment()
      const children = dynamicRender()
      appendChildren(fragment, [children])
      return fragment
    },
    {},
    [],
  )
  return com
}
