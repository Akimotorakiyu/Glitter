import { setAttrs } from './setAttrs'
import { TChildren, TElementTagNameMap } from './type'
import { reRankChildren } from './children'

export function createElement<K extends keyof TElementTagNameMap>(
  tag: K,
  attrs: TElementTagNameMap[K],
  childNodes: TChildren = [],
): TElementTagNameMap[K] {
  const element = document.createElement(tag)

  setAttrs(element, attrs, {})

  reRankChildren(element, childNodes)

  return element as unknown as TElementTagNameMap[K]
}
