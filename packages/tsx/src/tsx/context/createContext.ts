import { ContentNodeInfo, Context } from './type'

export const createContextWithUpdater = <P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
  contextStack: Context[],
  commonUpdater: (contextStack: Context[], comCtx: Context) => JSX.Element,
) => {
  const comCtx: Context = {
    tag,
    render: null as any,
    provider: Object.create(lastContext?.provider || null),
    onResize: [],
    isConnected: false,
    onConnected: [],
    onDisonnected: [],
    updater: () => {
      return commonUpdater(contextStack, comCtx)
    },
    props: props as any,
    created: false,
    staticContentNodeInfo: {
      domNodeInfo: {
        current: 0,
        list: [],
      },
      comNodeInfo: {
        current: 0,
        list: [],
      },
    },
    dynamicContentNodeInfo: {
      map: new Map<string, ContentNodeInfo>(),
      index: '',
    },
    children: [],
  }
  return comCtx
}