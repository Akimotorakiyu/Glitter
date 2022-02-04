namespace RenderDom {
  type TClassType = string | { [key: string]: boolean }

  export namespace RenderDomSVG {
    export type TSXSVGElementTagNameMap = {
      [tag in keyof SVGElementTagNameMap]: Partial<
        {
          [key in keyof SVGElementTagNameMap[tag]]:
            | Partial<SVGElementTagNameMap[tag][key]>
            | string
        } & {
          class: TClassType | TClassType[]
          style: Partial<SVGElementTagNameMap[tag]['style']>
          if: any
          ref: { current: null | SVGElementTagNameMap[tag] }
        }
      >
    }
  }
}

interface GlitterIntrinsicElementsMap {
  svg: RenderDom.RenderDomSVG.TSXSVGElementTagNameMap
}
