import { setCurrentElementCreator, addElementCreator } from '@shiro/render-core'
import { createHtmlElement } from './html'
import { createSvgElement } from './svg'
import { setAttrs } from './setAttrs'

function createTextElement(text: string): IShrioNode {
  return new Text(text) as unknown as IShrioNode
}

addElementCreator('html', {
  createElement: createHtmlElement as any,
  createTextElement,
  setAttribute: setAttrs as any,
})

addElementCreator('svg', {
  createElement: createSvgElement,
  createTextElement,
  setAttribute: setAttrs as any,
})

setCurrentElementCreator('html')

export function renderToHtml() {
  setCurrentElementCreator('html')
}
export function renderToSvg() {
  setCurrentElementCreator('svg')
}
