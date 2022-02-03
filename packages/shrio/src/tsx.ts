import { createElement, Fragment } from '@glitter/render-core'

export const htsx = <HTSX>{
  createElement,
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
