export interface GlitterRef<T> {
  current: undefined | T
}

export type GlitterRefType<T> = T extends (...arg: any[]) => infer R
  ? GlitterRef<R>
  : GlitterRef<T>

export const createRef = <T>(t?: T): GlitterRefType<T> => {
  return {
    current: null,
  } as GlitterRefType<T>
}
