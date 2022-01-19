// todo: need more safe impl
export function kebabCase(str: string) {
  return str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLocaleLowerCase()
  })
}

export function convertObjectToAttrStringArray(o: Object) {
  return Object.entries(o)
    .filter(([v, should]) => {
      return Boolean(should)
    })
    .map(([v]) => {
      return v
    })
}
