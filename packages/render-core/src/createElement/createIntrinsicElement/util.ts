import {
  isFragmentElement,
  isIntrinsicElement,
  isStructElement,
  isTextElement,
} from '@shrio/core'

export function getNode(n: any) {
  if (
    isIntrinsicElement(n) ||
    isFragmentElement(n) ||
    isStructElement(n) ||
    isTextElement(n)
  ) {
    return n
  } else {
    return String(n)
  }
}

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
