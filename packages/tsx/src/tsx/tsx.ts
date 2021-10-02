import { createElement } from './createElement'
import { createFragment } from './createFragment'
export * from './createElement'
export * from './createFragment'
export const htsx = <HTSX>{
  createElement: createElement,
  Fragment: createFragment,
}

Reflect.set(window, 'htsx', htsx)
