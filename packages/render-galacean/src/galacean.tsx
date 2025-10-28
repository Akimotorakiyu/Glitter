import {
  childNodesSymbol,
  IGlitterNode,
  insertBeforeSymbol,
  markAsIntrinsicComponentMark,
  removeSymbol,
} from '@glitter/core'
import {
  BlinnPhongMaterial,
  MeshRenderer,
  PrimitiveMesh,
  WebGLEngine,
} from '@galacean/engine'
import { Entity } from '@galacean/engine'
import { JSX, htsx } from '@glitter/render-core'
export type GalaceanElements = {
  entity: (
    props: Partial<{
      name: string
      engine: WebGLEngine
      if: boolean
      ref: { current: undefined | Entity }
    }>,
  ) => JSX.Element
}

export const galaceanElements: GalaceanElements = new Proxy(
  {} as GalaceanElements,
  {
    get(obj, key) {
      return (
        props: { engine: WebGLEngine; ref: { current: undefined | Entity } },
        children: IGlitterNode,
      ) => {
        const Ele = () => {
          const ele = new Entity(props.engine)

          const renderer = ele.addComponent(MeshRenderer)
          const mtl = new BlinnPhongMaterial(props.engine)
          const color = mtl.baseColor
          color.r = 0.0
          color.g = 0.8
          color.b = 0.5
          color.a = 1.0
          renderer.mesh = PrimitiveMesh.createCuboid(props.engine)
          renderer.setMaterial(mtl)

          if (props.ref) {
            props.ref.current = ele
          }

          Object.defineProperty(ele, childNodesSymbol, {
            get() {
              return this.children
            },
          })
          Object.defineProperty(ele, removeSymbol, {
            get() {
              return this.parent.removeChild(this)
            },
          })
          Object.defineProperty(ele, insertBeforeSymbol, {
            get() {
              return function insertBefore(node, nIndexChildInParent) {
                this.addChild(nIndexChildInParent?.siblingIndex || 0, node)
              }
            },
          })
          return ele as unknown as IGlitterNode
        }
        markAsIntrinsicComponentMark(Ele)
        return <Ele {...props}>{children}</Ele>
      }
    },
  },
)
