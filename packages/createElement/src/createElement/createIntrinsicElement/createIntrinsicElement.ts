import { arrangeChildren } from '../arrangeChildren'
import { getCurrentVDomNode } from '../createComponent/componentContext'
import { emptyNode } from '../createComponent/emptyNode'
import { ShrioFragment } from '../fragment'
import { createElement } from './createElement'
import { setAttrs } from './setAttrs'
import { shouldShowComponent } from './tool'

export const createIntrinsicElement = <P extends Record<string, any>>(
  tag: keyof HTMLElementTagNameMap,
  props: P,
  childNodes: (Node | ShrioFragment)[],
): Node | ShrioFragment => {
  // create and push
  const shouldShow = shouldShowComponent(props)
  const vDomNode = getCurrentVDomNode()

  if (shouldShow) {
    if (!vDomNode.node) {
      vDomNode.node = createElement(tag, props as any, childNodes)
      vDomNode.props = props
    } else {
      setAttrs(vDomNode.node as HTMLElement, props, vDomNode.props)
      vDomNode.props = props
      arrangeChildren(vDomNode.node, childNodes)
    }

    if ('ref' in props) {
      props.ref.current = vDomNode.node
    }

    return vDomNode.node
  } else {
    if (!props?.keepAlive && vDomNode.node) {
      ;(vDomNode.node as ChildNode).remove()
      vDomNode.node = null
      if ('ref' in props) {
        props.ref.current = null
      }
    }
    return emptyNode
  }
}
