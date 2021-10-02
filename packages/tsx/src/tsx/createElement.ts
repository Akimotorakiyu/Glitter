import { createFragment } from './createFragment'
import { createIntrinsicElement } from './createIntrinsicElement'
import { createComponent } from './createComponent'
import { flatenChildren } from '@shiro/create-element'

export const createElement = <P extends {}>(
  tag: JsxTagType<P>,
  props: P,
  ...children: JSX.Element[]
): JSX.Element => {
  const childnodes = flatenChildren(children)

  if (typeof tag === 'function') {
    if ((tag as unknown) === createFragment) {
      return createFragment(null, childnodes)
    } else {
      return createComponent(tag, props ?? {}, childnodes)
    }
  } else {
    return createIntrinsicElement(tag, props ?? {}, childnodes)
  }
}
