import { replaceChildren } from '../../arrangeChildren'
import { GlitterFragment } from './glitterFragment'

export const generateAndApplyReMounter = (
  parentElement: IGlitterNode,
  children: IGlitterNode[],
) => {
  const glitterFragmentNodes = children.filter(
    (child) => child instanceof GlitterFragment,
  ) as unknown[] as GlitterFragment[]

  const reMount = (glitterFragment?: GlitterFragment) => {
    if (parentElement instanceof GlitterFragment) {
      parentElement.reMount!()
    } else {
      glitterFragmentNodes.forEach((fragment) => {
        if (fragment !== glitterFragment) {
          fragment.reloadChildren!()
        }
      })

      replaceChildren(parentElement, children)
    }
  }

  glitterFragmentNodes.forEach((fragment) => {
    fragment.reMount = reMount
  })

  return glitterFragmentNodes
}
