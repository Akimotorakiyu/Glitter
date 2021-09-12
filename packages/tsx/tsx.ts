import { getNode, createElement, setAttrs } from '@shiro/create-element'
import { Context } from './context'
import { isElementClassInstance } from './tool'

let ctxStack: Context[] = []
let currentCtx: Context | null = null

export function getCurrentCtx() {
  return currentCtx!
}

export const htsx = <HTSX>{
  createElement<P extends {}>(
    tag: JsxTagType<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element {
    if (typeof tag === 'function') {
      const lastContext = currentCtx
      if (lastContext) {
        ctxStack.push(lastContext)
      }

      const comCtx: Context = {
        provides: Object.create(lastContext?.provides || null),
        onResize: [],
        isConnected: false,
        onConnected: [],
        onDisonnected: [],
        updater: null as unknown as any,
        props,
        nodeInfo: {
          first: true,
          current: 0,
          list: [],
        },
      }

      currentCtx = comCtx
      const res = tag(props, children, { provide: {} })

      if (isElementClassInstance(res)) {
        currentCtx.updater = () => {
          const lastContext = currentCtx
          if (lastContext) {
            ctxStack.push(lastContext)
          }
          currentCtx = comCtx
          comCtx.nodeInfo.current = 0
          const _ = res.render()
          currentCtx = ctxStack.pop()!

          return _
        }
        const ele = res.render()

        currentCtx = ctxStack.pop()!
        comCtx.nodeInfo.first = false

        return ele
      } else {
        currentCtx.updater = () => {
          const lastContext = currentCtx
          if (lastContext) {
            ctxStack.push(lastContext)
          }
          currentCtx = comCtx
          comCtx.nodeInfo.current = 0
          const _ = tag(props, children, { provide: {} })
          currentCtx = ctxStack.pop()!
          return _
        }

        currentCtx = ctxStack.pop()!
        comCtx.nodeInfo.first = false
        return res
      }
    } else {
      // create and push
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
  Fragment(props: null, children: JSX.Element[]) {
    const fragment = new DocumentFragment()
    children
      .flat(Infinity)
      .map((child) => getNode(child))
      .forEach((child) => {
        fragment.appendChild(child)
      })
    return fragment
  },
}

Reflect.set(window, 'htsx', htsx)
