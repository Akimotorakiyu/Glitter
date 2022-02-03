export type TCreateElement = (tag: string) => IGlitterNode
export type TCreateTextElement = (tag: string) => IGlitterNode
export type TSetAttribute = (
  glitterNode: IGlitterNode,
  newProps: Record<string, any>,
  oldProps: Record<string, any>,
) => void

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
