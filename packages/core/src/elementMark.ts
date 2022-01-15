export const intrinsicElementMark = Symbol('intrinsicElementMark')
export const fragmentElementMark = Symbol('fragmentElementMark')
export const structElementMark = Symbol('structElementMark')
export const textElementMark = Symbol('textElementMark')

function elementTypeJudge<T>(
  element: Record<any, any>,
  key: symbol,
): element is T {
  return (typeof element === 'object' || typeof element === 'function') &&
    Reflect.get(element, key)
    ? true
    : false
}

function markElementType(element: Record<any, any>, key: symbol) {
  return Reflect.set(element, key, true)
}

/**
 * IntrinsicElement
 * @param element
 * @returns
 */
export function isIntrinsicElement(
  element: Record<any, any>,
): element is IShrioNode {
  return elementTypeJudge<IShrioNode>(element, intrinsicElementMark)
}

export function markAsIntrinsicElement(element: Record<any, any>) {
  return markElementType(element, intrinsicElementMark)
}

/**
 * FragmentElement
 * @param element
 * @returns
 */
export function isFragmentElement(
  element: Record<any, any>,
): element is IShrioFragment {
  return elementTypeJudge<IShrioFragment>(element, fragmentElementMark)
}

export function markAsFragmentElement(element: Record<any, any>) {
  return markElementType(element, fragmentElementMark)
}

/**
 * structElement
 */

export function isStructElement(
  element: Record<any, any>,
): element is IElementStruct {
  return elementTypeJudge<IElementStruct>(element, structElementMark)
}

export function markAsStructElement(element: Record<any, any>) {
  return markElementType(element, structElementMark)
}
/**
 * textElement
 */

export function isTextElement(
  element: Record<any, any>,
): element is IShrioNode {
  return elementTypeJudge<IShrioNode>(element, textElementMark)
}

export function markAsTextElement(element: Record<any, any>) {
  return markElementType(element, textElementMark)
}
