import { getNode } from './tool'

export const addChild = (parentNde: Node, childNodes: Node[]) => {
  ;[...parentNde.childNodes].forEach((el) => {
    el.remove()
  })

  childNodes
    .flat(Infinity)
    .filter((e) => Boolean(e))
    .map((child) => getNode(child))
    .forEach((child) => {
      parentNde.appendChild(child)
    })
}
