import { Context } from './type'

export const updateStack: Map<Context, (() => void)[]> = new Map()
export const updateRootList: Set<Context> = new Set()

const executeAsyncUpdateFlow = () => {
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

const hasParent = (ctx: Context): boolean => {
  if (updateStack.has(ctx)) {
    return true
  } else if (ctx.parent) {
    return hasParent(ctx.parent)
  } else {
    return false
  }
}

const arrangeAsyncUpdateFlow = () => {
  updateStack.forEach((value, key) => {
    updateRootList.add(key)
  })
  updateRootList.forEach((value, key) => {
    if (key.parent && hasParent(key.parent)) {
      updateRootList.delete(key)
    }
  })
}

const runAsyncUpdateFlow = () => {
  arrangeAsyncUpdateFlow()
  executeAsyncUpdateFlow()
}

let requestAnimationFrameId = 0
export const scheduleRunAsyncUpdateFlow = () => {
  if (!requestAnimationFrameId) {
    requestAnimationFrameId = requestAnimationFrame(() => {
      runAsyncUpdateFlow()
      requestAnimationFrameId = 0
    })
  }
}

export const addAsyncUpdateTask = (comCtx: Context) => {
  const p = new Promise<void>((r) => {
    const array = updateStack.get(comCtx)

    if (array) {
      array.push(r)
    } else {
      updateStack.set(comCtx, [r])
    }
  })

  return p
}

export const addAndScheduleAsyncUpdateTask = async (comCtx: Context) => {
  scheduleRunAsyncUpdateFlow()
  return addAsyncUpdateTask(comCtx)
}
