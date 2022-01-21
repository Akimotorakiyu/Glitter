import { markAsIntrinsicElement, markAsTextElement } from '@shrio/core'
import { arrangeChildrenInner } from '../arrangeChildren'
import { getCurrentVDomNode } from '../createComponent/componentContext'
import { emptyNode } from '../createComponent/emptyNode'
import { getCurrentElementCreator } from './elementCreator'
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
      vDomNode.node = getCurrentElementCreator().createElement(tag)

      markAsIntrinsicElement(vDomNode.node)
      getCurrentElementCreator().setAttribute(vDomNode.node, props, {})
      arrangeChildrenInner(vDomNode.node, childNodes)
      vDomNode.props = props
    } else {
      getCurrentElementCreator().setAttribute(
        vDomNode.node,
        props,
        vDomNode.props,
      )
      vDomNode.props = props
      arrangeChildrenInner(vDomNode.node, childNodes)
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
    const textNode = getCurrentElementCreator().createTextElement(text)
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
