import { commonUpdater } from './commonUpdater'
import { createContextHub } from './event/eventTarget'
import { addAndScheduleAsyncUpdateTask } from './asyncUpdateFlow'
import { FakeRootComponent } from './rootComponent'
import {
  ContentNodeInfo,
  Context,
  IFactoryComponent,
  IFunctionComponent,
  isFragmentElement,
} from '@glitter/core'

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
      // FakeRootComponent root 组件 不需要更新
      // 以下两个都可以让FakeRootComponent这个reMount逻辑不执行
      // todo: 需要更合理的设计
      if (comCtx.tag === FakeRootComponent) {
        return
      }
      if (isFragmentElement(res)) {
        // root 组件时候 reMount 不存在
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
