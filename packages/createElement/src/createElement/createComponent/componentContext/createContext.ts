import { commonUpdater } from './commonUpdater'
import {
  ContentNodeInfo,
  Context,
  IFactoryComponent,
  IFunctionComponent,
} from './type'
import { createContextHub } from './event/eventTarget'
import { ShrioFragment } from '../../..'

export const updateStack: Map<Context, (() => void)[]> = new Map()
export const updateRootList: Set<Context> = new Set()

export const runAsyncUpdate = () => {
  updateRootList.forEach((ctx) => {
    ctx.syncUpdater()
  })
  updateStack.forEach((s) => {
    s.forEach((r) => {
      r()
    })
  })
  updateRootList.clear()
  updateStack.clear()
}

export const arrangeUpdateFlow = () => {
  updateStack.forEach((value, key) => {
    updateRootList.add(key)
  })
  updateRootList.forEach((value, key) => {
    if (key.parent && hasParent(key.parent)) {
      updateRootList.delete(key)
    }
  })
}

export const arrangeAndRunUpdateFlow = () => {
  arrangeUpdateFlow()
  runAsyncUpdate()
}

const hasParent = (ctx: Context): boolean => {
  if (updateStack.has(ctx)) {
    return true
  } else if (ctx.parent) {
    return hasParent(ctx.parent)
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
        res.reMount!(res)
      }
    },
    asyncUpdater: () => {
      const p = new Promise<void>((r) => {
        const array = updateStack.get(comCtx)

        if (array) {
          array.push(r)
        } else {
          updateStack.set(comCtx, [r])
        }
      })
      return p
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
