import { getNode } from './tool'

// 不应该给这个节点加子节点
export const emptyNode = new DocumentFragment()

export const flatenChildren = (childNodes: unknown[]) => {
  const children = childNodes
    .flat(Infinity)
    // .filter((e) => Boolean(e))
    .map((child) => getNode(child))

  return children
}

export const replaceChildren = (
  parentElement: Element,
  childNodes: unknown[],
) => {
  const children = flatenChildren(childNodes)
  parentElement.replaceChildren(...children)
}

export const appendChildren = (
  parentElement: Element | DocumentFragment,
  childNodes: unknown[],
) => {
  const children = flatenChildren(childNodes)
  parentElement.append(...children)
}
