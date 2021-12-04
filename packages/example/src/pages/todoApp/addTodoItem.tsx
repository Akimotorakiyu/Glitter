import { defineView } from '@shrio/shrio'
import { stateSuite } from './state'

const { portal } = stateSuite

export const TodoItemAdd = defineView(() => {
  const operation = portal.inject()

  return (
    <div class="flex items-center">
      <input
        class="outline-none text-gray-700 w-full"
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
      ></input>
    </div>
  )
})
