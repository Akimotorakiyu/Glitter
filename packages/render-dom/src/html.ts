export function createHtmlElement(tag: string) {
  return document.createElement(tag) as unknown as IShrioNode
}
