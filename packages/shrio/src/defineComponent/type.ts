export interface GlitterProps {
  if?: any
  keepAlive?: any
  ref?: any
}

export interface IComponentStateFactoryProto<
  P,
  S extends Record<string, unknown>,
> {
  (props: P, children: TElementValue[], ctx: Context): S
}

export interface IFactoryView<F, S> {
  (state: S, children: TElementValue[], ctx: Context): TElementValue
}
