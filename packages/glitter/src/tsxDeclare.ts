declare namespace JSX {
  // The Intrinsic Elements Type Map
  type IntrinsicElements = TSXIntrinsicElements

  // The Class Component Instance Type or Factory Return Value Type
  interface ElementClass {
    render: () => TElementValue
  }
  // The JSX result type
  type Element = TElementValue
}

declare type JsxTagType<P> =
  | JsxFunctionComponent<P>
  | JsxFactoryComponent<P>
  | keyof TSXIntrinsicElements

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
  Fragment(props: null, children: JSX.Element[]): IGlitterFragment
}

declare const htsx: HTSX
