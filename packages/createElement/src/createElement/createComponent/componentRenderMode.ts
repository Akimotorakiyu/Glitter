type RenderMode = 'deep' | 'shallow'
let updateMode: RenderMode = 'deep'

export const setUpdateMode = (mode: RenderMode) => {
  updateMode = 'deep'
}

export const shouldDeep = () => {
  return updateMode === 'deep'
}
