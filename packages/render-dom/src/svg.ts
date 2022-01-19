export function createSvgElement(tag: string) {
  return document.createElementNS(
    'http://www.w3.org/2000/svg',
    tag,
  ) as unknown as IShrioNode
}
