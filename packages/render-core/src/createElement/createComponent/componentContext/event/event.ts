export type Listenner<
  E extends string | number | symbol,
  Args extends unknown[],
> = (event: E, ...args: Args) => void | Promise<void>

export interface MessageProtcol {
  [props: string]: unknown[]
}

export interface MessageCenter<Protcol extends MessageProtcol> {
  removeAction: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => void
  addAction: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => void
  dispatch: <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    ...args: Args
  ) => (void | Promise<void>)[]
}

export const createMessageCenter = <
  Protcol extends MessageProtcol,
>(): MessageCenter<Protcol> => {
  const listennerMap = new Map<
    keyof Protcol,
    Set<Listenner<string | number | symbol, unknown[]>>
  >()

  const removeAction = <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => {
    const listennerSet = listennerMap.get(event)
    if (listennerSet) {
      listennerSet.delete(listenner as any)
      if (!listennerSet.size) {
        listennerMap.delete(event)
      }
    }
  }

  const addAction = <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    listenner: Listenner<E, Args>,
  ) => {
    let listennerSet = listennerMap.get(event)
    if (listennerSet) {
      listennerSet.add(listenner as any)
    } else {
      listennerSet = new Set()
      listennerSet.add(listenner as any)
      listennerMap.set(event, listennerSet)
    }
  }

  const dispatch = <E extends keyof Protcol, Args extends Protcol[E]>(
    event: E,
    ...args: Args
  ) => {
    const listennerSet = listennerMap.get(event) || []

    return [...listennerSet].map((listenner) => listenner(event, ...args))
  }

  return {
    addAction,
    dispatch,
    removeAction,
  }
}
