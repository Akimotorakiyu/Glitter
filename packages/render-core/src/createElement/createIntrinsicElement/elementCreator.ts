export type TCreateElement = (tag: string) => IShrioNode
export type TCreateTextElement = (tag: string) => IShrioNode
export type TSetAttribute = (
  shrioNode: IShrioNode,
  newProps: Record<string, any>,
  oldProps: Record<string, any>,
) => void

import { setAttrs } from './setAttrs'

export interface IElementCreator {
  createElement: TCreateElement
  createTextElement: TCreateTextElement
  setAttribute: TSetAttribute
}

const elementCreatorMap = new Map<string | symbol, IElementCreator>()
const currentElementCreator: { currentElementCreator?: IElementCreator } = {}

export function getCurrentElementCreator() {
  if (!currentElementCreator.currentElementCreator) {
    throw new Error('至少有一个 element creator')
  } else {
    return currentElementCreator.currentElementCreator
  }
}

export function addElementCreator(
  key: string | symbol,
  elementCreator: IElementCreator,
) {
  elementCreatorMap.set(key, elementCreator)
}

export function setCurrentElementCreator(key: string | symbol) {
  currentElementCreator.currentElementCreator = elementCreatorMap.get(key)
}

addElementCreator('dom', {
  createElement(tag: string) {
    const element = document.createElement(tag)
    return element as unknown as IShrioNode
  },
  createTextElement(text: string): IShrioNode {
    return new Text(text) as unknown as IShrioNode
  },
  setAttribute: setAttrs,
})

setCurrentElementCreator('dom')
