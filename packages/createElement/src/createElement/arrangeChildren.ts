import { generateAndApplyReMounter } from './fragment/shrioFragment/generateAndApplyReMounter'
import { ShrioFragment } from './fragment/shrioFragment/shrioFragment'

export const arrangeChildren = (
  parentElement: Element | ShrioFragment,
  childNodes: Node[],
) => {
  generateAndApplyReMounter(parentElement, childNodes)
  parentElement.replaceChildren(...childNodes)
}
