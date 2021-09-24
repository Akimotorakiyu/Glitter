import { getNode } from './tool'
import { ShrioFragment } from './shrioFragment'
// 不应该给这个节点加子节点
export const emptyNode = new DocumentFragment()

export const flatenChildren = (childNodes: unknown[]) => {
  const children = childNodes
    .flat(Infinity)
    // .filter((e) => Boolean(e))
    .map((child) => getNode(child))

  return children
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
  childNodes: unknown[],
) => {
  const children = flatenChildren(childNodes)

  generateAndApplyReMounter(parentElement, children)

  parentElement.replaceChildren(...children)
}

export const appendChildren = (
  parentElement: Element | DocumentFragment,
  childNodes: unknown[],
) => {
  const children = flatenChildren(childNodes)
  generateAndApplyReMounter(parentElement, children)
  parentElement.append(...children)
}
