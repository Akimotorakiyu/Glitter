export interface ShrioRef<T> {
  current: null | T
}

type ShrioRefType<T> = T extends (...arg: any[]) => infer R
  ? ShrioRef<R>
  : ShrioRef<T>

export const createRef = <T>(t?: T): ShrioRefType<T> => {
  return {
    current: null,
  }
}
