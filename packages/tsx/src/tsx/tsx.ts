import { createElement, setAttrs } from '@shiro/create-element'
import {
  createAndPushContext,
  getCurrentContext,
  popContext,
  pushContext,
} from './context'
import { isElementClassInstance } from '../tool'
import { Fragment } from './Fragment'

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
      // create and push
      const currentCtx = getCurrentContext()
      if (currentCtx?.nodeInfo.first) {
        const ele = createElement(tag, props as any, children)

        currentCtx?.nodeInfo.list.push(ele)

        return ele
      } else {
        const ele = currentCtx?.nodeInfo.list[currentCtx?.nodeInfo.current]!
        console.log(ele, children)
        setAttrs(ele as HTMLElement, props)
        // todo
        // 设置文字节点，需要额外的处理逻辑，以为只有一个节点更新逻辑，此处为了demo 快速跑通，这里先直接设置上去
        if (typeof children[0] === 'string') {
          ;(ele as HTMLDivElement).innerText = children[0] as string
        }
        currentCtx!.nodeInfo.current++
        // just update props
        return ele
      }
    }
  },
  Fragment,
}

Reflect.set(window, 'htsx', htsx)
