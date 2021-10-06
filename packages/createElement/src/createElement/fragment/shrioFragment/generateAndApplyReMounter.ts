import { ShrioFragment } from './shrioFragment'

export const generateAndApplyReMounter = (
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
