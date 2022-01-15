import { Context } from '../createElement/createComponent/componentContext/type'

export interface ShrioProps {
  if?: any
  keepAlive?: any
  ref?: any
}

export interface IStateFactory<P, S extends Record<string, unknown>> {
  (props: P, children: TElementValue[], ctx: Context): S
}

export interface IFactoryView<F, S> {
  (state: S, children: TElementValue[], ctx: Context): TElementValue
}
