import {
  isElementStructInstance,
  shouldShowComponent,
  updateProps,
  updateChildNodes,
} from '../createIntrinsicElement/tool'
import { getNode } from '../createIntrinsicElement/util'
import {
  createComponentContext,
  getCurrentVComNode,
  popContext,
  pushContext,
} from './componentContext'
import { IFactoryComponent, IFunctionComponent } from './componentContext/type'
import { emptyNode } from './emptyNode'

export const createComponent = <P extends Record<string, any>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
  childNodes: Node[],
): Node => {
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
      const isElementClassInstanceRes = isElementStructInstance(res)
      const ele = getNode(isElementClassInstanceRes ? res.render() : res)
      context.render = isElementClassInstanceRes
        ? () => {
            return getNode(res.render())
          }
        : () => {
            return getNode(tag(props, childNodes, context))
          }
      popContext()
      vComNode.node.created = true

      if (isElementClassInstanceRes && 'ref' in props) {
        props.ref.current = res
      }

      vComNode.node.active = true
      vComNode.node.hub.dispatch('created')
      vComNode.node.hub.dispatch('active')
      return ele
    } else {
      vComNode.node.hub.dispatch('beforeUpdated')
      updateProps(vComNode.node.props, props)
      updateChildNodes(vComNode.node.childNodes, childNodes)
      const ele = vComNode.node.updater()

      vComNode.node.hub.dispatch('updated')
      if (!vComNode.node.active) {
        vComNode.node.active = true
        vComNode.node.hub.dispatch('active')
      }

      return ele
    }
  } else {
    if (!props?.keepAlive) {
      if (vComNode.node) {
        vComNode.node.hub.dispatch('destory')
        vComNode.node = null
      }
      if ('ref' in props) {
        props.ref.current = null
      }
    } else {
      if (vComNode.node?.active) {
        vComNode.node.active = false
        vComNode.node.hub.dispatch('inactive')
      }
    }
    return emptyNode
  }
}
