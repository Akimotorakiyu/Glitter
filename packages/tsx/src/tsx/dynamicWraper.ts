import { getCurrentContext } from './context'

const setKey = (key: string) => {
  const parentCtx = getCurrentContext()
  parentCtx.dynamicContentNodeInfo.index.push(key)
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

    parentCtx.dynamicContentNodeInfo.depth--
    return ele
  }
}
