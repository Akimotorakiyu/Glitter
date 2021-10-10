import { commonUpdater } from './commonUpdater'
import {
  ContentNodeInfo,
  Context,
  IFactoryComponent,
  IFunctionComponent,
} from './type'
import { createContextHub } from './event/eventTarget'
export const createContextWithUpdater = <P extends Record<string, unknown>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
  contextStack: Context[],
) => {
  const comCtx: Context = {
    tag,
    render: null as any,
    parent: lastContext,
    provider: Object.create(lastContext?.provider || null),
    onResize: [],
    isConnected: false,
    onConnected: [],
    onDisonnected: [],
    updater: () => {
      return commonUpdater(contextStack, comCtx)
    },
    active: true,
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
      fragmentNodeInfo: {
        current: 0,
        list: [],
      },
    },
    childNodes: [],
    dynamicContentNodeInfo: {
      map: new Map<string, ContentNodeInfo>(),
      keyStack: [],
      depth: 0,
      markSet: new Set(),
    },
    hub: createContextHub(),
  }
  return comCtx
}
