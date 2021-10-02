import { setKey } from './tsx/dynamicWraper'
import { getCurrentContext } from './tsx/context'
import { createElement } from './tsx/createElement'

export const Component = <P>(
  props: { is: JsxTagType<P> } & P,
  ...children: JSX.Element[]
) => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.depth++
  setKey(props.is as string)
  const ele = createElement(props.is, props, ...children)

  parentCtx.dynamicContentNodeInfo.keyStack.pop()
  parentCtx.dynamicContentNodeInfo.depth--
  return ele
}
