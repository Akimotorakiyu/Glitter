export const intrinsicElementMark = Symbol('intrinsicElementMark')
export const fragmentElementMark = Symbol('fragmentElementMark')
export const structElementMark = Symbol('structElementMark')
export const factoryComponentMark = Symbol('structElementFactoryMark')
export const functionComponentMark = Symbol('elementFactoryMark')
export const textElementMark = Symbol('textElementMark')

function elementTypeJudge<T>(element: any, key: symbol): element is T {
  return (typeof element === 'object' || typeof element === 'function') &&
    Reflect.get(element, key)
    ? true
    : false
}

function markElementType(element: Record<any, any>, key: symbol) {
  const result = Reflect.set(element, key, true)
  return result
}

/**
 * IntrinsicElement
 * @param element
 * @returns
 */
export function isIntrinsicElement(
  element: Record<any, any>,
): element is IGlitterNode {
  return elementTypeJudge<IGlitterNode>(element, intrinsicElementMark)
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
): element is IGlitterFragment {
  return elementTypeJudge<IGlitterFragment>(element, fragmentElementMark)
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
 * structElementFactory
 */

export function isFactoryComponent(
  element: Record<any, any>,
): element is IFactoryComponent {
  return elementTypeJudge<IElementStruct>(element, factoryComponentMark)
}

export function markAsFactoryComponent(element: Record<any, any>) {
  return markElementType(element, factoryComponentMark)
}
/**
 * elementFactory
 */

export function isFunctionComponent(
  element: Record<any, any>,
): element is IFunctionComponent {
  return elementTypeJudge<IElementStruct>(element, functionComponentMark)
}

export function markAsFunctionComponent(element: Record<any, any>) {
  return markElementType(element, functionComponentMark)
}

/**
 * textElement
 */

export function isTextElement(
  element: Record<any, any>,
): element is IGlitterNode {
  return elementTypeJudge<IGlitterNode>(element, textElementMark)
}

export function markAsTextElement(element: Record<any, any>) {
  return markElementType(element, textElementMark)
}
