import { getNode } from './tool'
import { ShrioFragment } from './shrioFragment'
// 不应该给这个节点加子节点
export const emptyNode = new DocumentFragment()

export const flatenChildren = (children: unknown[]) => {
  const childNodes = children
    .flat(Infinity)
    // .filter((e) => Boolean(e))
    .map((child) => getNode(child))

  return childNodes
}

const generateAndApplyReMounter = (
  parentElement: Element | DocumentFragment,
  children: Node[],
) => {
  const shrioFragmentNodes = children.filter(
    (child) => child instanceof ShrioFragment,
  ) as ShrioFragment[]

  const reMount = (shrioFragment?: ShrioFragment) => {
    if (parentElement instanceof ShrioFragment) {
      parentElement.reMount!()
    } else {
      shrioFragmentNodes.forEach((fragment) => {
        if (fragment !== shrioFragment) {
          fragment.reloadChildren!()
        }
      })
      parentElement.replaceChildren(...children)
    }
  }

  shrioFragmentNodes.forEach((fragment) => {
    fragment.reMount = reMount
  })

  return shrioFragmentNodes
}

export const replaceChildren = (
  parentElement: Element | DocumentFragment,
  childNodes: Node[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)
  parentElement.replaceChildren(...childNodes)
}

export const appendChildren = (
  parentElement: Element | DocumentFragment,
  childNodes: Node[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)
  parentElement.append(...childNodes)
}
