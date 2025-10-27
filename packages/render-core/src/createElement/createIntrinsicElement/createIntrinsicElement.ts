import {
  childNodesSymbol,
  IGlitterNode,
  insertBeforeSymbol,
  markAsIntrinsicElement,
  markAsTextElement,
  removeSymbol,
  TElementValue,
} from '@glitter/core'
import { arrangeChildrenInner } from '../arrangeChildren'
import { getCurrentVDomNode } from '../createComponent/componentContext'
import { emptyNode } from '../createComponent/emptyNode'
import { shouldShowComponent } from './tool'

export const createIntrinsicElement = <P extends Record<string, any>>(
  tag: () => IGlitterNode,
  props: P,
  childNodes: TElementValue[],
): IGlitterNode => {
  // create and push
  const shouldShow = shouldShowComponent(props)
  const vDomNode = getCurrentVDomNode()

  if (shouldShow) {
    if (!vDomNode.node) {
      vDomNode.node = tag()

      markAsIntrinsicElement(vDomNode.node)
      props.setAttribute?.(vDomNode.node, props, {})
      arrangeChildrenInner(vDomNode.node, childNodes)
      vDomNode.props = props
    } else {
      props.setAttribute?.(vDomNode.node, props, vDomNode.props)
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

export const createTextNode = (text: string): IGlitterNode => {
  // create and push
  const vDomNode = getCurrentVDomNode()

  if (!vDomNode.node) {
    const textNode: IGlitterNode = {
      value: text,
      [childNodesSymbol]: [],
      [insertBeforeSymbol]() {},
      [removeSymbol]() {
        throw new Error('Shpould not call remove on raw text node')
      },
    } as IGlitterNode
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
