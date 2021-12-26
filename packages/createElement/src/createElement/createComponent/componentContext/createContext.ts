import { commonUpdater } from './commonUpdater'
import {
  ContentNodeInfo,
  Context,
  IFactoryComponent,
  IFunctionComponent,
} from './type'
import { createContextHub } from './event/eventTarget'
import { ShrioFragment } from '../../..'
import { addAndScheduleAsyncUpdateTask } from './asyncUpdateFlow'

const isContain = (parent: Context, ctx: Context): boolean => {
  if (ctx.parent === parent) {
    return true
  } else if (ctx.parent) {
    return isContain(parent, ctx.parent)
  } else {
    return false
  }
}

export const createContextWithUpdater = <P extends Record<string, unknown>>(
  tag: IFunctionComponent<P> | IFactoryComponent<P>,
  props: P,
  lastContext: Context | null,
  contextStack: Context[],
) => {
  const comCtx: Context = {
    tag,
    element: null,
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
    syncUpdater: () => {
      const res = comCtx.updater?.()
      if (res instanceof ShrioFragment) {
        res.reMount?.(res)
      }
    },
    asyncUpdater: () => {
      return addAndScheduleAsyncUpdateTask(comCtx)
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
    contains: (ctx: Context) => {
      return isContain(comCtx, ctx)
    },
  }
  return comCtx
}
