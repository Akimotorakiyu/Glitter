namespace RenderDom {
  type TClassType = string | { [key: string]: boolean }

  export namespace RenderDomHtml {
    export type TSXHTMLElementTagNameMap = {
      [tag in keyof HTMLElementTagNameMap]: Partial<
        {
          [key in keyof HTMLElementTagNameMap[tag]]:
            | Partial<HTMLElementTagNameMap[tag][key]>
            | string
        } & {
          class: TClassType | TClassType[]
          style: Partial<HTMLElementTagNameMap[tag]['style']>
          if: any
          ref: { current: null | HTMLElementTagNameMap[tag] }
        }
      >
    }
  }
}

interface GlitterIntrinsicElementsMap {
  html: RenderDom.RenderDomHtml.TSXHTMLElementTagNameMap
}
