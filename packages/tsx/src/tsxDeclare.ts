type TElementTagNameMap = HTMLElementTagNameMap

type TClassType = string | { [key: string]: boolean }

declare type JsxElementTagNameMap = {
  [tag in keyof TElementTagNameMap]: Partial<
    {
      [key in keyof TElementTagNameMap[tag]]:
        | Partial<TElementTagNameMap[tag][key]>
        | string
    } & {
      class: TClassType | TClassType[]
      style: Partial<TElementTagNameMap[tag]['style']>
      if: any
      ref: { current?: TElementTagNameMap[tag] }
    }
  >
}

type DomElement = Element

declare namespace JSX {
  // The Intrinsic Elements Type Map
  type IntrinsicElements = JsxElementTagNameMap

  // The Class Component Instance Type or Factory Return Value Type
  interface ElementClass {
    render: () => Element
  }
  // The JSX result type
  type Element =
    | ElementClass
    | HTMLElement
    | DocumentFragment
    | Node
    | DomElement
    | number
    | string
    | boolean
}

declare type JsxTagType<P> =
  | JsxFunctionComponent<P>
  | JsxFactoryComponent<P>
  | keyof TElementTagNameMap

declare type JsxFunctionComponent<P> = (
  props: P,
  children: JSX.Element[],
  ctx: {
    provider: Record<string, any>
  },
) => JSX.Element

declare type JsxFactoryComponent<P> = (
  props: P,
  children: JSX.Element[],
  ctx: {
    provider: Record<string, any>
  },
) => JSX.ElementClass

declare interface HTSX {
  createElement<P>(
    tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element
  createElement<Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    props: JSX.IntrinsicElements[Tag],
    ...children: JSX.Element[]
  ): JSX.Element
  Fragment(props: null, children: JSX.Element[]): DocumentFragment
}

declare const htsx: HTSX
