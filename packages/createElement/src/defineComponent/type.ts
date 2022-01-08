import {
  Context,
  TElementValue,
} from '../createElement/createComponent/componentContext/type'

export interface ShrioProps {
  if?: any
  keepAlive?: any
  ref?: any
}

export interface IStateFunction<P, S extends Record<string, unknown>> {
  (props: P, children: Node[], ctx: Context): S
}

export interface IStateFactory<P, S extends Record<string, unknown>> {
  (props: P, children: Node[], ctx: Context): S
}

export interface IFactoryView<F, S> {
  (state: S, children: Node[], ctx: Context): TElementValue
}
