export function createHtmlElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
) {
  return document.createElement(tag)
}
