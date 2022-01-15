import { createElement, Fragment } from '@shiro/render-core'

export const htsx = <HTSX>{
  createElement,
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
