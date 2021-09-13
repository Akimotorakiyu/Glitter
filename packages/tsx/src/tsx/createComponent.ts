import { isElementClassInstance } from '../tool'
import { createAndPushContext, popContext } from './context'

export const createComponent = <P extends {}>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  children: JSX.Element[],
): JSX.Element => {
  const comCtx = createAndPushContext(tag)

  const res = tag(props, children, comCtx)
  const ele = isElementClassInstance(res) ? res.render() : res

  popContext()
  comCtx.nodeInfo.first = false
  return ele
}
