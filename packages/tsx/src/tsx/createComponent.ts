import {
  isElementClassInstance,
  shouldShowComponent,
  updateProps,
  updateChildNodes,
} from './tool'
import {
  createComponentContext,
  getCurrentVComNode,
  popContext,
  pushContext,
} from './context'
import { emptyNode } from '@shiro/create-element'

export const createComponent = <P extends Record<string, any>>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  childNodes: Node[],
): JSX.Element => {
  const shouldShow = shouldShowComponent(props)
  const vComNode = getCurrentVComNode()

  if (shouldShow) {
    if (!vComNode.node) {
      const context = (vComNode.node = createComponentContext(
        tag,
        props || ({} as any),
      ))
      context.childNodes = childNodes
      pushContext(context)

      const res = tag(props, childNodes, context)
      const isElementClassInstanceRes = isElementClassInstance(res)
      const ele = isElementClassInstanceRes ? res.render() : res
      context.render = isElementClassInstanceRes
        ? () => {
            return res.render()
          }
        : () => {
            return tag(props, childNodes, context)
          }
      popContext()
      vComNode.node.created = true

      if (isElementClassInstanceRes && 'ref' in props) {
        props.ref.current = res
      }

      return ele
    } else {
      updateProps(vComNode.node.props, props)
      updateChildNodes(vComNode.node.childNodes, childNodes)
      const ele = vComNode.node.updater()
      return ele
    }
  } else {
    if (!props?.keepAlive) {
      vComNode.node = null
      if ('ref' in props) {
        props.ref.current = null
      }
    }
    return emptyNode
  }
}
