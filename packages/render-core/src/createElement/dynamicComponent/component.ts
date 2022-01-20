import { getCurrentContext } from '../createComponent/componentContext'
import { setKey } from '../createComponent/componentContext/setDynamicContentNodeKey'
import { createElement } from '../createElement'

export const Component = <P extends Record<string, unknown>>(
  props: {
    is: TCompontentType<P> | string
    key?: string
    keepAlive?: boolean
  } & P,
  children: IShrioNode[],
): TElementValue => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.depth++
  setKey(props.key || (props.is as string))
  const { is, key, ...p } = props
  const ele = createElement(is, p as any, ...children)

  parentCtx.dynamicContentNodeInfo.keyStack.pop()
  parentCtx.dynamicContentNodeInfo.depth--
  return ele
}
