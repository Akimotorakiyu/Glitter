type TClassType = string | { [key: string]: boolean }

import {
  childNodesSymbol,
  IGlitterNode,
  insertBeforeSymbol,
  markAsIntrinsicComponentMark,
  removeSymbol,
} from '@glitter/core'
import { JSX, htsx } from '@glitter/render-core'
import { setAttrs } from './setAttrs'

export type TSVGElements = {
  [tag in keyof SVGElementTagNameMap]: (
    props: Partial<
      {
        [key in keyof SVGElementTagNameMap[tag]]:
          | Partial<SVGElementTagNameMap[tag][key]>
          | string
      } & {
        class: TClassType | TClassType[]
        style: Partial<SVGElementTagNameMap[tag]['style']>
        if: any
        ref: { current: null | SVGElementTagNameMap[tag] }
      } & {
        //  todo: for svg path element
        d: string
        t: string
        version: string
        xmlns: string
        fill: string
      }
    >,
  ) => JSX.Element
}

export const svgElements: TSVGElements = new Proxy({} as TSVGElements, {
  get(obj, key) {
    return (props: {}, children: IGlitterNode) => {
      const Ele = () => {
        const ele = document.createElementNS(
          'http://www.w3.org/2000/svg',
          key as string,
        ) as unknown as IGlitterNode
        Object.defineProperty(ele, childNodesSymbol, {
          get() {
            return this.childNodes
          },
        })
        Object.defineProperty(ele, removeSymbol, {
          get() {
            return this.remove
          },
        })
        Object.defineProperty(ele, insertBeforeSymbol, {
          get() {
            return function insertBefore(node, nIndexChildInParent) {
              if (node instanceof Node) {
                this.insertBefore(node, nIndexChildInParent)
              } else {
                const newNode = node.key || new Text(node.value)
                node.key = newNode

                if (!(removeSymbol in newNode)) {
                  Object.defineProperty(newNode, removeSymbol, {
                    get() {
                      return this.remove
                    },
                  })
                }

                this.insertBefore(newNode, nIndexChildInParent)
              }
            }
          },
        })

        return ele
      }
      markAsIntrinsicComponentMark(Ele)
      return (
        <Ele {...props} setAttribute={setAttrs}>
          {children}
        </Ele>
      )
    }
  },
})
