import { dynamic, useUpdater } from '@shrio/tsx'

type ITodoItemStatus = 'Pending' | 'Completed'

interface ITodoItem {
  id: string
  desc: string
  status: ITodoItemStatus
  importat: boolean
}

const TodoItemView = ({
  todoItem,
  completeTask,
}: {
  todoItem: ITodoItem
  completeTask: (todoItem: ITodoItem) => void
}) => {
  return (
    <div class="flex items-center">
      <button
        class={[
          `w-4 h-4 rounded-full bg-gray-200 outline-none border-none`,
          {
            'bg-green-200': todoItem.status === 'Completed',
            'bg-blue-200': todoItem.status === 'Pending',
          },
        ]}
        onclick={() => {
          completeTask(todoItem)
        }}
      ></button>
      <span class="ml-4">{todoItem.desc}</span>
    </div>
  )
}
const TodoItemAdd = ({
  addTask,
}: {
  addTask: (todoItem: ITodoItem, callBack: () => void) => void
}) => {
  return (
    <div class="flex items-center">
      <input
        class="outline-none "
        placeholder="Add a task"
        onkeydown={(e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'enter') {
            const inputNode = e.currentTarget as HTMLInputElement
            addTask(
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
}

const Kanban = ({
  status,
  todoList,
  completeTask,
}: {
  status: ITodoItemStatus
  todoList: ITodoItem[]
  completeTask: (todoItem: ITodoItem) => void
}) => {
  return (
    <div class="my-2">
      <h2 class="text-gray-600">{status}</h2>
      <div class="mx-2">
        {todoList
          .filter((item) => item.status === status)
          .map(
            dynamic((setKey, item) => {
              setKey(item.id)
              return (
                <TodoItemView
                  completeTask={completeTask}
                  todoItem={item}
                ></TodoItemView>
              )
            }),
          )}
      </div>
    </div>
  )
}

export const TodoApp = ({}: {}) => {
  const todoList: ITodoItem[] = [
    {
      desc: '吃饭',
      id: '1',
      status: 'Pending',
      importat: true,
    },
    {
      desc: '睡觉',
      id: '2',
      status: 'Completed',
      importat: true,
    },
    {
      desc: '喝水',
      id: '3',
      status: 'Pending',
      importat: true,
    },
  ]

  const updater = useUpdater()

  const addTask = (todoItem: ITodoItem, callBack: () => void) => {
    todoList.push(todoItem)
    updater()
    callBack()
  }

  const completeTask = (todoItem: ITodoItem) => {
    todoItem.status = todoItem.status === 'Completed' ? 'Pending' : 'Completed'
    updater()
  }

  return {
    render() {
      return (
        <>
          <div class=" w-80 shadow-lg p-6 rounded-lg">
            <h1 class="my-4">A simple todo list.</h1>
            <div class="h-50 overflow-y-auto shadow-inner px-4 py-2 rounded-md">
              <Kanban
                status="Pending"
                todoList={todoList}
                completeTask={completeTask}
              ></Kanban>
              <Kanban
                status="Completed"
                todoList={todoList}
                completeTask={completeTask}
              ></Kanban>
            </div>
            <div class="my-4">
              <TodoItemAdd addTask={addTask}></TodoItemAdd>
            </div>
          </div>
        </>
      )
    },
  }
}
