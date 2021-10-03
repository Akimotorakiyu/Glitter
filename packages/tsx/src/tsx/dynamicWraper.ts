import { getCurrentContext } from './context'
import { createElement } from './createElement'

export const setKey = (key: string) => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.keyStack.push(key)
  parentCtx.dynamicContentNodeInfo.markSet.delete(key)
  if (!parentCtx.dynamicContentNodeInfo.map.has(key)) {
    parentCtx.dynamicContentNodeInfo.map.set(key, {
      isDynamic: true,
      domNodeInfo: {
        current: 0,
        list: [],
      },
      comNodeInfo: {
        current: 0,
        list: [],
      },
      fragmentNodeInfo: {
        list: [],
        current: 0,
      },
    })
  }
}

export const dynamic = <T>(
  dynamicRender: (
    setkey: (key: string) => void,
    item: T,
    index: number,
    arr: T[],
  ) => JSX.Element,
) => {
  return (item: T, index: number, arr: T[]) => {
    const parentCtx = getCurrentContext()
    parentCtx.dynamicContentNodeInfo.depth++

    const ele = dynamicRender(setKey, item, index, arr)

    parentCtx.dynamicContentNodeInfo.keyStack.pop()
    parentCtx.dynamicContentNodeInfo.depth--
    return ele
  }
}

export const Component = <P extends Record<string, unknown>>(
  props: { is: JsxTagType<P>; key?: string; keepAlive?: boolean } & P,
  children: JSX.Element[],
) => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.depth++
  setKey(props.key || (props.is as string))
  const { is, key, ...p } = props
  console.log('Component', is, children)
  const ele = createElement(is, p as any, ...children)

  parentCtx.dynamicContentNodeInfo.keyStack.pop()
  parentCtx.dynamicContentNodeInfo.depth--
  return ele
}
