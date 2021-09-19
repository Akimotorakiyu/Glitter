const setKey = (key: string) => {}
export const dynamic = <T>(
  dynamicRender: (
    setkey: (key: string) => void,
    item: T,
    index: number,
    arr: T[],
  ) => JSX.Element,
) => {
  return (item: T, index: number, arr: T[]) => {
    const ele = dynamicRender(setKey, item, index, arr)
    return ele
  }
}
