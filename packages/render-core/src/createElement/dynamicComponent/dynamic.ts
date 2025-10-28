import { TElementValue } from '@glitter/core'
import { getCurrentContext } from '../createComponent/componentContext'
import { setKey } from '../createComponent/componentContext/setDynamicContentNodeKey'

export const dynamic = <T>(
  dynamicRender: (
    setkey: (key: string) => void,
    item: T,
    index: number,
    arr: T[],
  ) => TElementValue,
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
