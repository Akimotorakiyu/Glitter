export interface ShrioRef<T> {
  current: undefined | T
}

export const createRef = <T>(t?: T): ShrioRef<T> => {
  return {
    current: undefined,
  }
}
