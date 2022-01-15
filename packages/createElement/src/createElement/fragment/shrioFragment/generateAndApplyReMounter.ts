import { replaceChildren } from '../../arrangeChildren'
import { ShrioFragment } from './shrioFragment'

export const generateAndApplyReMounter = (
  parentElement: IShrioNode,
  children: IShrioNode[],
) => {
  const shrioFragmentNodes = children.filter(
    (child) => child instanceof ShrioFragment,
  ) as unknown[] as ShrioFragment[]

  const reMount = (shrioFragment?: ShrioFragment) => {
    if (parentElement instanceof ShrioFragment) {
      parentElement.reMount!()
    } else {
      shrioFragmentNodes.forEach((fragment) => {
        if (fragment !== shrioFragment) {
          fragment.reloadChildren!()
        }
      })

      replaceChildren(parentElement, children)
    }
  }

  shrioFragmentNodes.forEach((fragment) => {
    fragment.reMount = reMount
  })

  return shrioFragmentNodes
}
