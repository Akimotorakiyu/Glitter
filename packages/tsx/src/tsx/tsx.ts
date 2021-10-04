import { createElement } from './createElement'
import { Fragment } from './fragment'
export * from './createElement'
export * from './fragment'
export const htsx = <HTSX>{
  createElement,
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
