import {
  shouldShowComponent,
  updateProps,
  updateChildNodes,
} from '../createIntrinsicElement/tool'
import {
  createComponentContext,
  getCurrentVComNode,
  popContext,
  pushContext,
} from './componentContext'
import { emptyNode } from './emptyNode'
import { removeFromUpdateRootList } from './componentContext/asyncUpdateFlow'
import { shouldDeep } from './componentRenderMode'
import { isFragmentElement, isStructElement } from '@shrio/core'
export const createComponent = <P extends Record<string, any>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
  childNodes: TElementValue[],
): TElementValue => {
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
      const isElementClassInstanceRes = isStructElement(res)
      const ele = isElementClassInstanceRes ? res.render() : res
      vComNode.node.element = ele

      if (isElementClassInstanceRes) {
        context.render = () => {
          return res.render()
        }
      } else {
        context.render = () => {
          return tag(props, childNodes, context) as TElementValue
        }
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
      removeFromUpdateRootList(vComNode.node)

      vComNode.node.hub.dispatch('beforeUpdated')
      const propsChanged = updateProps(vComNode.node.props, props)
      const childChanged = updateChildNodes(
        vComNode.node.childNodes,
        childNodes,
      )
      if (shouldDeep() || propsChanged || childChanged) {
        const ele = vComNode.node.updater()
        vComNode.node.hub.dispatch('updated')
        if (!vComNode.node.active) {
          vComNode.node.active = true
          vComNode.node.hub.dispatch('active')
        }

        return ele
      } else {
        const ele = vComNode.node.element!
        if (isFragmentElement(ele)) {
          ele.reloadChildren!()
          return ele
        } else {
          return ele
        }
      }
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
