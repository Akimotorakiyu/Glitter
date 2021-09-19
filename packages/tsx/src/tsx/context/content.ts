import { createContextWithUpdater } from './createContext'
import { Context } from './type'

const ctxStack: Context[] = []

export function getCurrentContext() {
  const currentCtx = ctxStack[ctxStack.length - 1]
  if (currentCtx) {
    return currentCtx
  } else {
    return createContext(() => '<This is fake root!>', null, null)
  }
}

export function pushContext(context: Context) {
  ctxStack.push(context)
}

export function popContext() {
  ctxStack.pop()
}

export function createContext<P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
) {
  const comCtx = createContextWithUpdater(tag, props, lastContext, ctxStack)
  return comCtx
}
