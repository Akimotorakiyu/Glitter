import { createElement, setAttrs, addChild } from '@shiro/create-element'
import { getCurrentContext } from './context'
import { shouldShowComponent } from './tool'

export const createIntrinsicElement = <P extends {}>(
  tag: keyof HTMLElementTagNameMap,
  props: P,
  children: JSX.Element[],
): Node => {
  // create and push
  const currentCtx = getCurrentContext()

  if (currentCtx?.created) {
    const vDomNode =
      currentCtx?.domNodeInfo.list[currentCtx?.domNodeInfo.current]!
    const shouldShow = shouldShowComponent(props)
    if (shouldShow) {
      if (!vDomNode.node) {
        vDomNode.node = createElement(tag, props as any, children)
      } else {
        setAttrs(vDomNode.node as HTMLElement, props)
      }

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
          ;(vDomNode.node as HTMLDivElement).innerText = children[0] as string
        } else {
          addChild(vDomNode.node, children as Node[])
        }
        currentCtx!.domNodeInfo.current++
        // just update props
      }

      return vDomNode.node
    } else {
      if (vDomNode.node) {
        ;(vDomNode.node as ChildNode).remove()
        vDomNode.node = null as any
      }
      return null as unknown as Node
    }
  } else {
    // if (shouldShowComponent(props)) {
    //   const ele = createElement(tag, props as any, children)
    //   const vDomNode = {
    //     node: ele,
    //   }

    //   currentCtx?.domNodeInfo.list.push(vDomNode)
    //   return vDomNode.node
    // } else {
    //   const vDomNode = {
    //     node: null as any,
    //   }

    //   currentCtx?.domNodeInfo.list.push(vDomNode)
    //   return vDomNode.node
    // }

    const ele = createElement(tag, props as any, children)
    const vDomNode = {
      node: ele,
    }

    currentCtx?.domNodeInfo.list.push(vDomNode)
    return vDomNode.node
  }
}
