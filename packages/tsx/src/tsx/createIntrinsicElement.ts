import {
  createElement,
  setAttrs,
  replaceChildren,
  emptyNode,
} from '@shiro/create-element'
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
          // todo
          // 若有新加入的节点，只需要将新加入的节点插入对应位置即可
          // 在domNode中标记出来，节点是新加入的这样就非常的容易处理了
          // 若没有新加入的节点，则什么都不需要做
          // 这里为了快速跑通，先直接整体替换
          replaceChildren(vDomNode.node, children as Node[])
        }
      }

      currentCtx!.domNodeInfo.current++

      return vDomNode.node
    } else {
      if (vDomNode.node) {
        ;(vDomNode.node as ChildNode).remove()
        vDomNode.node = null
      }
      return emptyNode
    }
  } else {
    if (shouldShowComponent(props)) {
      const ele = createElement(tag, props as any, children)
      const vDomNode = {
        node: ele,
      }

      currentCtx?.domNodeInfo.list.push(vDomNode)
      return vDomNode.node
    } else {
      const vDomNode = {
        node: null,
      }

      currentCtx?.domNodeInfo.list.push(vDomNode)
      return emptyNode
    }
  }
}
