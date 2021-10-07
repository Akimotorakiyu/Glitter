import { Fragment } from './fragment/fragment'
import { createIntrinsicElement } from './createIntrinsicElement/createIntrinsicElement'
import { createComponent } from './createComponent/createComponent'
import {
  TCompontentType,
  TElementValue,
} from './createComponent/componentContext'
import { flatenChildren } from './flatenChildren'

export const createElement = <P extends Record<string, unknown>>(
  tag: TCompontentType<P> | string,
  props: P,
  ...children: TElementValue[]
): Node => {
  const childNodes = flatenChildren(children)

  if (typeof tag === 'function') {
    if ((tag as unknown) === Fragment) {
      return Fragment(null, childNodes)
    } else {
      return createComponent(tag, props ?? {}, childNodes)
    }
  } else {
    // tag maybe is unknown tag
    return createIntrinsicElement(
      tag as keyof HTMLElementTagNameMap,
      props ?? {},
      childNodes,
    )
  }
}
