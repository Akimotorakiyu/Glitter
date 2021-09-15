import { Fragment } from './Fragment'
import { createIntrinsicElement } from './createIntrinsicElement'
import { createComponent } from './createComponent'
export const htsx = <HTSX>{
  createElement<P extends {}>(
    tag: JsxTagType<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element {
    if (typeof tag === 'function') {
      return createComponent(tag, props ?? {}, children)
    } else {
      return createIntrinsicElement(tag, props ?? {}, children)
    }
  },
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
