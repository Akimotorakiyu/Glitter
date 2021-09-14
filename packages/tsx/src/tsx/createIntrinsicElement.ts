import { createElement, setAttrs } from '@shiro/create-element'
import { getCurrentContext } from './context'

export const createIntrinsicElement = <P extends {}>(
  tag: keyof HTMLElementTagNameMap,
  props: P,
  children: JSX.Element[],
): Node => {
  // create and push
  const currentCtx = getCurrentContext()

  if (currentCtx?.created) {
    const ele = currentCtx?.domNodeInfo.list[currentCtx?.domNodeInfo.current]!
    console.log(ele, children)
    setAttrs(ele as HTMLElement, props)

    // todo
    // 设置文字节点，需要额外的处理逻辑
    // 此处为了demo 快速跑通, 文字节点同级无node节点，这里先直接将文字设置上去
    {
      const stringContent = children
        .map((child) => {
          const type = typeof child
          switch (type) {
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'string':
              return child
              break

            default:
              return ''
              break
          }
        })
        .join('')

      if (stringContent.length) {
        ;(ele as HTMLDivElement).innerText = children[0] as string
      }
    }

    currentCtx!.domNodeInfo.current++
    // just update props
    return ele
  } else {
    const ele = createElement(tag, props as any, children)

    currentCtx?.domNodeInfo.list.push(ele)
    return ele
  }
}
