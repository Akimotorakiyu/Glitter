import { createContext, getCurrentContext } from './content'

export function createComponentContext<P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
) {
  const lastContext = getCurrentContext()

  const currentCtx = createContext(tag, props, lastContext)

  return currentCtx
}
