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
