import { createContext, getCurrentContext } from './content'
import { IFactoryComponent, IFunctionComponent } from './type'

export function createComponentContext<P extends Record<string, unknown>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
) {
  const lastContext = getCurrentContext()

  const currentCtx = createContext(tag, props, lastContext)

  return currentCtx
}
