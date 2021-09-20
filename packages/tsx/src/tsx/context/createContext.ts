import { commonUpdater } from './commonUpdater'
import { ContentNodeInfo, Context } from './type'

export const createContextWithUpdater = <P>(
  tag: JsxFunctionComponent<P> | JsxFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
  contextStack: Context[],
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
      isDynamic: false,
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
      keyStack: [],
      depth: 0,
    },
    children: [],
  }
  return comCtx
}
