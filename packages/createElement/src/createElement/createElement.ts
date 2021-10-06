import { Fragment } from './fragment/fragment'
import { createIntrinsicElement } from './createIntrinsicElement/createIntrinsicElement'
import { createComponent } from './createComponent/createComponent'
import { TCompontentType } from './createComponent/componentContext'
import { flatenChildren } from './flatenChildren'

export const createElement = <P extends Record<string, unknown>>(
  tag: TCompontentType<P> | string,
  props: P,
  ...children: Node[]
): Node => {
  const childnodes = flatenChildren(children)

  if (typeof tag === 'function') {
    if ((tag as unknown) === Fragment) {
      return Fragment(null, childnodes)
    } else {
      return createComponent(tag, props ?? {}, childnodes)
    }
  } else {
    // tag maybe is unknown tag
    return createIntrinsicElement(
      tag as keyof HTMLElementTagNameMap,
      props ?? {},
      childnodes,
    )
  }
}
