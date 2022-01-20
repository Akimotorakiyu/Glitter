import { createContext, getCurrentContext } from './content'

export function createComponentContext<P extends Record<string, unknown>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
) {
  const lastContext = getCurrentContext()

  const currentCtx = createContext(tag, props, lastContext)

  return currentCtx
}
