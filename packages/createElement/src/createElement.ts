import { setAttrs } from './setAttrs'
import { getNode } from './tool'
import { TChildren, TElementTagNameMap } from './type'

export function createElement<K extends keyof TElementTagNameMap>(
  tag: K,
  attrs: TElementTagNameMap[K],
  childNodes: TChildren = [],
): TElementTagNameMap[K] {
  const element = document.createElement(tag)

  setAttrs(element, attrs)

  // 添加子元素
  childNodes
    .flat(Infinity)
    .map((child) => getNode(child))
    .forEach((child) => {
      element.appendChild(child)
    })

  return element as unknown as TElementTagNameMap[K]
}
