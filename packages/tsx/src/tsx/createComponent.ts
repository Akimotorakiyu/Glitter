import { isElementClassInstance } from '../tool'
import { createAndPushContext, popContext, pushContext } from './context'

export const createComponent = <P extends {}>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  children: JSX.Element[],
): JSX.Element => {
  const comCtx = createAndPushContext(props)
  const res = tag(props, children, { provide: {} })

  if (isElementClassInstance(res)) {
    comCtx.updater = () => {
      pushContext(comCtx)
      comCtx.nodeInfo.current = 0
      const _ = res.render()
      popContext()

      return _
    }
    const ele = res.render()

    popContext()
    comCtx.nodeInfo.first = false

    return ele
  } else {
    comCtx.updater = () => {
      pushContext(comCtx)

      comCtx.nodeInfo.current = 0
      const _ = tag(props, children, { provide: {} })
      popContext()
      return _
    }

    popContext()
    comCtx.nodeInfo.first = false
    return res
  }
}
