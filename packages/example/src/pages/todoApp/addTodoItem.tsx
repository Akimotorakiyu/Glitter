import { defineView } from '@glitter/glitter'
import { stateSuite } from './state'
import { htmlElements as h, htsx } from '@glitter/render-dom'
const portal = stateSuite

export const TodoItemAdd = defineView(() => {
  const operation = portal.inject()

  return (
    <h.div class="flex items-center">
      <h.input
        class="w-full text-gray-700 outline-none"
        placeholder="Add a task"
        maxLength="16"
        onkeydown={(e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'enter') {
            const inputNode = e.currentTarget as HTMLInputElement
            operation.methods.addTask(
              {
                desc: inputNode.value || '',
                status: 'Pending',
                id: Date.now() + '',
              },
              () => {
                inputNode.value = ''
                inputNode.focus()
              },
            )
          }
        }}
      ></h.input>
    </h.div>
  )
})
