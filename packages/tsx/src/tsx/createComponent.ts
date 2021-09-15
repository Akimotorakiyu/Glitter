import { isElementClassInstance, updateProps } from './tool'
import { createAndPushContext, getCurrentContext, popContext } from './context'

export const createComponent = <P extends {}>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  children: JSX.Element[],
): JSX.Element => {
  const parentCtx = getCurrentContext()
  if (parentCtx?.created) {
    const comCtx = parentCtx.comNodeInfo.list[parentCtx.comNodeInfo.current]

    updateProps(comCtx.props, props)

    comCtx.children.length = 0

    children.forEach((child) => {
      comCtx.children.push(child)
    })

    const ele = comCtx.updater()

    parentCtx!.comNodeInfo.current++

    return ele
  } else {
    const comCtx = createAndPushContext(tag, props || ({} as any))
    const res = tag(props, children, comCtx)
    const isElementClassInstanceRes = isElementClassInstance(res)
    const ele = isElementClassInstanceRes ? res.render() : res
    comCtx.render = isElementClassInstanceRes
      ? () => {
          return res.render()
        }
      : () => {
          return tag(props, children, comCtx)
        }
    popContext()
    comCtx.created = true
    parentCtx?.comNodeInfo.list.push(comCtx)
    return ele
  }
}
