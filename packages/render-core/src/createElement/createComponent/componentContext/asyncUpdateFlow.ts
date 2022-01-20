export const updateStatus = {
  plan: new Map<Context, (() => void)[]>(),
  pending: new Map<Context, (() => void)[]>(),
}

const executeAsyncUpdateFlow = () => {
  updateStatus.pending.forEach((value, ctx) => {
    ctx.syncUpdater()
  })
  updateStatus.pending.forEach((s) => {
    s.forEach((r) => {
      r()
    })
  })
  updateStatus.pending.clear()
}

export const removeFromUpdateRootList = (ctx: Context) => {
  updateStatus.pending.delete(ctx)
}

const arrangeAsyncUpdateFlow = () => {
  // need to ensure sort result
  const sortedList = [...updateStatus.plan.entries()].sort(([ctxA], [ctxB]) => {
    if (ctxA.contains(ctxB)) {
      return 1
    } else if (ctxB.contains(ctxA)) {
      return -1
    } else {
      return 0
    }
  })

  updateStatus.plan.clear()
  updateStatus.pending = new Map(sortedList)
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
    const array = updateStatus.plan.get(comCtx)

    if (array) {
      array.push(r)
    } else {
      updateStatus.plan.set(comCtx, [r])
    }
  })

  return p
}

export const addAndScheduleAsyncUpdateTask = async (comCtx: Context) => {
  scheduleRunAsyncUpdateFlow()
  return addAsyncUpdateTask(comCtx)
}
