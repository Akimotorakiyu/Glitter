import { createElement, Fragment } from '@shiro/create-element'

export const htsx = <HTSX>{
  createElement,
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
