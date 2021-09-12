import { getNode, createElement } from '@shiro/create-element'
const isElementClassInstance = (com: JSX.Element): com is JSX.ElementClass => {
  const _ = com as any
  return _.render ? true : false
}
export const htsx = <HTSX>{
  createElement<P extends {}>(
    tag: JsxTagType<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element {
    if (typeof tag === 'function') {
      const _tag = tag
      const res = _tag(props, children, { provide: {} })

      if (isElementClassInstance(res)) {
        return res.render()
      } else {
        return res
      }
    } else {
      const ele = createElement(tag, props as any, children)

      return ele
    }
  },
  Fragment(props: null, children: JSX.Element[]) {
    const fragment = new DocumentFragment()
    children
      .flat(Infinity)
      .map((child) => getNode(child))
      .forEach((child) => {
        fragment.appendChild(child)
      })
    return fragment
  },
}

Reflect.set(window, 'htsx', htsx)
