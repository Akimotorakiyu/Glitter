import {
  setCurrentElementCreator,
  addElementCreator,
} from '@glitter/render-core'
import { createHtmlElement } from './html'
import { createSvgElement } from './svg'
import { setAttrs } from './setAttrs'
import './globalType.ts/htmlType'
import './globalType.ts/svgType'
function createTextElement(text: string): IGlitterNode {
  return new Text(text) as unknown as IGlitterNode
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
