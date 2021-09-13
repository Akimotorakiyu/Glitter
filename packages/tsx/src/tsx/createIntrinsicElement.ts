import { createElement, setAttrs } from '@shiro/create-element'
import { getCurrentContext, popContext } from './context'

export const createIntrinsicElement = <P extends {}>(
  tag: keyof HTMLElementTagNameMap,
  props: P,
  children: JSX.Element[],
): Node => {
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
