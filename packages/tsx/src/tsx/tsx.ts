import { createFragment } from './createFragment'
import { createIntrinsicElement } from './createIntrinsicElement'
import { createComponent } from './createComponent'
export const htsx = <HTSX>{
  createElement<P extends {}>(
    tag: JsxTagType<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element {
    if (typeof tag === 'function') {
      if ((tag as unknown) === createFragment) {
        return createFragment(null, children)
      } else {
        return createComponent(tag, props ?? {}, children)
      }
    } else {
      return createIntrinsicElement(tag, props ?? {}, children)
    }
  },
  Fragment: createFragment,
}

Reflect.set(window, 'htsx', htsx)
