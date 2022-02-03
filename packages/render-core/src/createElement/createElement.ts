import {
  isFragmentElement,
  isIntrinsicElement,
  isStructElement,
  isTextElement,
} from '@glitter/core'

import { Fragment } from './fragment/fragment'
import {
  createIntrinsicElement,
  createTextNode,
} from './createIntrinsicElement/createIntrinsicElement'
import { createComponent } from './createComponent/createComponent'

export const createElement = <P extends Record<string, unknown>>(
  tag: TCompontentType<P> | string,
  props: P,
  ...children: TElementValue[]
): TElementValue => {
  const childNodes = children.flat(Infinity).map((n) => {
    if (
      isIntrinsicElement(n) ||
      isFragmentElement(n) ||
      isStructElement(n) ||
      isTextElement(n)
    ) {
      return n
    } else {
      return createTextNode(String(n))
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
