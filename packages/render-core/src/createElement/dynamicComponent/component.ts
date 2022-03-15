import { markAsFunctionComponent } from '@glitter/core'
import { getCurrentContext } from '../createComponent/componentContext'
import { setKey } from '../createComponent/componentContext/setDynamicContentNodeKey'
import { createElement } from '../createElement'

export interface GlitterProps {
  if?: any
  keepAlive?: any
  ref?: any
}

export const Component = <P extends Record<string, unknown>>(
  props: {
    is: TCompontentType<P & GlitterProps> | string
    key?: string
    keepAlive?: boolean
  } & P,
  children: IGlitterNode[],
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
markAsFunctionComponent(Component)
