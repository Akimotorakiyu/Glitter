import { Fragment } from './fragment/fragment'
import {
  createIntrinsicElement,
  createTextNode,
} from './createIntrinsicElement/createIntrinsicElement'
import { createComponent } from './createComponent/createComponent'
import {
  TCompontentType,
  TElementValue,
} from './createComponent/componentContext'
import { flatenChildren } from './flatenChildren'
import { ShrioFragment } from '..'

export const createElement = <P extends Record<string, unknown>>(
  tag: TCompontentType<P> | string,
  props: P,
  ...children: TElementValue[]
): Node | ShrioFragment => {
  const childNodes = flatenChildren(children).map((n) => {
    if (typeof n === 'string') {
      return createTextNode(n)
    } else {
      return n
    }
  })

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
