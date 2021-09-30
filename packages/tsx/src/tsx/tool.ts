export const isElementClassInstance = (
  com: JSX.Element,
): com is JSX.ElementClass => {
  const _ = com as any
  return _.render ? true : false
}

export const updateProps = (
  targetProps: Record<string, any>,
  newProps: Record<string, any>,
) => {
  const keys = Object.keys(newProps)
  Object.keys(targetProps).forEach((key) => {
    if (!keys.includes(key)) {
      delete targetProps[key]
    }
  })

  Object.entries(newProps).forEach(([key, value]) => {
    if (targetProps[key] !== value) {
      targetProps[key] = value
    }
  })
}

export const updateChildNodes = (
  targetChildNodes: Node[],
  newChildNodes: Node[],
) => {
  targetChildNodes.length = 0
  newChildNodes.forEach((child) => {
    targetChildNodes.push(child)
  })
}

export const shouldShowComponent = <P>(props: P) => {
  return !('if' in props && !Boolean((props as { if?: any })?.if))
}
