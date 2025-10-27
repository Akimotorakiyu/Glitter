import { createElement } from './createElement/createElement'
import { Fragment } from './createElement/fragment'
import { HTSX } from './tsxDeclare'

export const htsx = <HTSX>{
  createElement,
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
