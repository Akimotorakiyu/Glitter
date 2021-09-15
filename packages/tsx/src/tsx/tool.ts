export const isElementClassInstance = (
  com: JSX.Element,
): com is JSX.ElementClass => {
  const _ = com as any
  return _.render ? true : false
}

export const updateProps = (
  props: Record<string, any>,
  newProps: Record<string, any>,
) => {
  const keys = Object.keys(newProps)
  Object.keys(props).forEach((key) => {
    if (!keys.includes(key)) {
      delete props[key]
    }
  })

  Object.entries(newProps).forEach(([key, value]) => {
    if (props[key] !== value) {
      props[key] = value
    }
  })
}
