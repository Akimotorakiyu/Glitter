import { setAttrs } from './setAttrs'
import { TChildren, TElementTagNameMap } from './type'
import { arrangeChildren } from '../arrangeChildren'
import { markAsIntrinsicElement } from '@shrio/core'

export function createElement<K extends keyof TElementTagNameMap>(
  tag: K,
  attrs: TElementTagNameMap[K],
  childNodes: TChildren = [],
): TElementTagNameMap[K] {
  const element = document.createElement(tag)
  markAsIntrinsicElement(element)

  setAttrs(element, attrs, {})
  arrangeChildren(element as unknown as IShrioNode, childNodes)

  return element as unknown as TElementTagNameMap[K]
}
