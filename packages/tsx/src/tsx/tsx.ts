import { createAndPushContext, popContext, pushContext } from './context'
import { isElementClassInstance } from '../tool'
import { Fragment } from './Fragment'
import { createIntrinsicElement } from './createIntrinsicElement'
export const htsx = <HTSX>{
  createElement<P extends {}>(
    tag: JsxTagType<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element {
    if (typeof tag === 'function') {
      const comCtx = createAndPushContext(props)
      const res = tag(props, children, { provide: {} })

      if (isElementClassInstance(res)) {
        comCtx.updater = () => {
          pushContext(comCtx)
          comCtx.nodeInfo.current = 0
          const _ = res.render()
          popContext()

          return _
        }
        const ele = res.render()

        popContext()
        comCtx.nodeInfo.first = false

        return ele
      } else {
        comCtx.updater = () => {
          pushContext(comCtx)

          comCtx.nodeInfo.current = 0
          const _ = tag(props, children, { provide: {} })
          popContext()
          return _
        }

        popContext()
        comCtx.nodeInfo.first = false
        return res
      }
    } else {
      return createIntrinsicElement(tag, props, children)
    }
  },
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
