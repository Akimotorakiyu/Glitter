import { defineView } from '@shrio/shrio'
import { portal } from './state'

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
            operation.addTask(
              {
                desc: inputNode.value || '',
                status: 'Pending',
                importat: false,
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
export const AsyncTodoItemAdd = defineView(() => {
  const operation = portal.inject()

  return (
    <div class="flex items-center">
      <input
        class="outline-none text-gray-700 w-full"
        placeholder="Async add task"
        maxLength="16"
        onkeydown={async (e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'enter') {
            const inputNode = e.currentTarget as HTMLInputElement
            await operation.asyncAddTask({
              desc: inputNode.value || '',
              status: 'Pending',
              importat: false,
              id: Date.now() + '',
            })

            inputNode.value = ''
            inputNode.focus()
          }
        }}
      ></input>
    </div>
  )
})
