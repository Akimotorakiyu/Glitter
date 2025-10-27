export declare namespace JSX {
  // The Class Component Instance Type or Factory Return Value Type
  interface ElementClass {
    render: () => TElementValue
  }
  // The JSX result type
  type Element = TElementValue
}

declare type JsxTagType<P> = JsxFunctionComponent<P> | JsxFactoryComponent<P>

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

import { IGlitterFragment, TElementValue } from '@glitter/core' // The Intrinsic Elements Type Map

export declare interface HTSX {
  createElement<P>(
    tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
    props: P,
    ...children: JSX.Element[]
  ): JSX.Element
  Fragment(props: null, children: JSX.Element[]): IGlitterFragment
}

declare const htsx: HTSX
