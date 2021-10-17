import {
  Context,
  TElementValue,
  IFunctionComponent,
  IFactoryComponent,
} from '../createElement/createComponent/componentContext/type'

export interface ShrioProps {
  if?: any
  keepAlive?: any
  ref?: any
}

export interface IFactoryState<
  P extends Record<string, unknown>,
  S extends Record<string, unknown>,
> {
  (props: P, children: Node[], ctx: Context): [
    props: S,
    children: Node[],
    ctx: Context,
  ]
}
export interface IFactoryView<F, S> {
  (state: S, children: Node[], ctx: Context): TElementValue
}
