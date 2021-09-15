export const isElementClassInstance = (
  com: JSX.Element,
): com is JSX.ElementClass => {
  const _ = com as any
  return _.render ? true : false
}
