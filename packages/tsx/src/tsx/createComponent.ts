import {
  isElementClassInstance,
  shouldShowComponent,
  updateProps,
} from './tool'
import {
  createComponentContext,
  getCurrentVComNode,
  popContext,
  pushContext,
} from './context'
import { emptyNode } from '@shiro/create-element'

export const createComponent = <P extends {}>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  children: JSX.Element[],
): JSX.Element => {
  const shouldShow = shouldShowComponent(props)
  const vComNode = getCurrentVComNode()

  if (shouldShow) {
    if (!vComNode.node) {
      const context = (vComNode.node = createComponentContext(
        tag,
        props || ({} as any),
      ))
      pushContext(context)

      const res = tag(props, children, context)
      const isElementClassInstanceRes = isElementClassInstance(res)
      const ele = isElementClassInstanceRes ? res.render() : res
      context.render = isElementClassInstanceRes
        ? () => {
            return res.render()
          }
        : () => {
            return tag(props, children, context)
          }
      popContext()
      vComNode.node.created = true
      return ele
    } else {
      updateProps(vComNode.node.props, props)
    }

    vComNode.node.children.length = 0

    children.forEach((child) => {
      vComNode.node!.children.push(child)
    })

    const ele = vComNode.node.updater()

    return ele
  } else {
    vComNode.node = null
    return emptyNode
  }
}
