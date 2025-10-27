import { TElementValue } from '@glitter/core'

export const updateProps = (
  targetProps: Record<string, any>,
  newProps: Record<string, any>,
) => {
  const keys = Object.keys(newProps)
  let propsChanged = false
  Object.keys(targetProps).forEach((key) => {
    if (!keys.includes(key)) {
      delete targetProps[key]
      propsChanged = true
    }
  })

  Object.entries(newProps).forEach(([key, value]) => {
    if (targetProps[key] !== value) {
      targetProps[key] = value
      propsChanged = true
    }
  })

  return propsChanged
}

export const updateChildNodes = (
  targetChildNodes: TElementValue[],
  newChildNodes: TElementValue[],
) => {
  let childrenChanged = false

  if (targetChildNodes.length !== newChildNodes.length) {
    childrenChanged = true
  } else {
    const hasChange = newChildNodes.some((child, index) => {
      const isTheSame = child !== targetChildNodes[index]
      return isTheSame
    })
    childrenChanged = hasChange
  }

  if (childrenChanged) {
    targetChildNodes.length = 0
    newChildNodes.forEach((child) => {
      targetChildNodes.push(child)
    })
  }

  return childrenChanged
}

export const shouldShowComponent = <P extends {}>(props: P) => {
  return !('if' in props && !Boolean((props as { if?: any })?.if))
}
