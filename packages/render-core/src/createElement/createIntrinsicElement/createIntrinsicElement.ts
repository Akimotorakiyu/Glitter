import { markAsTextElement } from '@shrio/core'
import { arrangeChildren } from '../arrangeChildren'
import { getCurrentVDomNode } from '../createComponent/componentContext'
import { emptyNode } from '../createComponent/emptyNode'
import { createElement } from './createElement'
import { setAttrs } from './setAttrs'
import { shouldShowComponent } from './tool'

export const createIntrinsicElement = <P extends Record<string, any>>(
  tag: keyof HTMLElementTagNameMap,
  props: P,
  childNodes: TElementValue[],
): IShrioNode => {
  // create and push
  const shouldShow = shouldShowComponent(props)
  const vDomNode = getCurrentVDomNode()

  if (shouldShow) {
    if (!vDomNode.node) {
      vDomNode.node = createElement(
        tag,
        props as any,
        childNodes,
      ) as unknown as IShrioNode
      vDomNode.props = props
    } else {
      setAttrs(vDomNode.node as unknown as HTMLElement, props, vDomNode.props)
      vDomNode.props = props
      arrangeChildren(vDomNode.node, childNodes)
    }

    if ('ref' in props) {
      props.ref.current = vDomNode.node
    }

    return vDomNode.node
  } else {
    if (!props?.keepAlive && vDomNode.node) {
      ;(vDomNode.node as unknown as ChildNode).remove()
      vDomNode.node = null
      if ('ref' in props) {
        props.ref.current = null
      }
    }
    return emptyNode
  }
}

export const createTextNode = (text: string): IShrioNode => {
  // create and push
  const vDomNode = getCurrentVDomNode()

  if (!vDomNode.node) {
    const textNode = new Text(text) as unknown as IShrioNode
    markAsTextElement(textNode)
    vDomNode.node = textNode
  } else {
    const textNode = vDomNode.node as unknown as Text

    if (textNode.data !== text) {
      textNode.data = text
    }
  }

  return vDomNode.node!
}
