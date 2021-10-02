import { dynamic, useUpdater, createProviderInjector } from '@shrio/tsx'

type ITodoItemStatus = 'Pending' | 'Completed'

interface ITodoItem {
  id: string
  desc: string
  status: ITodoItemStatus
  importat: boolean
}

const portal = createProviderInjector<{
  completeTask: (todoItem: ITodoItem) => void
  deleteTask: (todoItem: ITodoItem) => void
}>()

const TodoItemView = ({
  todoItem,
  completeTask,
  deleteTask,
}: {
  todoItem: ITodoItem
  completeTask: (todoItem: ITodoItem) => void
  deleteTask: (todoItem: ITodoItem) => void
}) => {
  const operation = portal.inject()
  return (
    <div class="flex items-center justify-between hover:bg-gray-100 px-4 rounded transition-colors duration-300 ease">
      <div class="flex items-center ">
        <button
          class={[
            `w-4 h-4 rounded-full outline-none border-none hover:shadow`,
            {
              'bg-green-200': todoItem.status === 'Completed',
              'bg-blue-200': todoItem.status === 'Pending',
            },
          ]}
          onclick={() => {
            // they are the same
            if (Math.random() > 0.5) {
              completeTask(todoItem)
            } else {
              operation.completeTask(todoItem)
            }
          }}
        ></button>
        <span class="ml-4 text-gray-700">{todoItem.desc}</span>
      </div>
      <button
        class={[
          `w-4 h-4 rounded-full bg-red-200 outline-none border-none hover:shadow`,
        ]}
        onclick={() => {
          // they are the same
          if (Math.random() > 0.5) {
            deleteTask(todoItem)
          } else {
            operation.deleteTask(todoItem)
          }
        }}
      ></button>
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
        class="outline-none text-gray-700 w-full"
        placeholder="Add a task"
        maxLength="16"
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

const KanbanContainer = (
  { title }: { title: string },
  childNodes: JSX.Element[],
) => {
  return (
    <>
      <div class="my-2">
        <>
          <h2 class="text-gray-500 select-none">{title}</h2>
          <div class="mx-2">{childNodes}</div>
        </>
      </div>
    </>
  )
}

const Kanban = ({
  status,
  todoList,
  completeTask,
  deleteTask,
}: {
  status: ITodoItemStatus
  todoList: ITodoItem[]
  completeTask: (todoItem: ITodoItem) => void
  deleteTask: (todoItem: ITodoItem) => void
}) => {
  return (
    <KanbanContainer title={status}>
      <>
        {todoList
          .filter((item) => item.status === status)
          .map(
            dynamic((setKey, item) => {
              setKey(item.id)
              return (
                <TodoItemView
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  todoItem={item}
                ></TodoItemView>
              )
            }),
          )}
      </>
    </KanbanContainer>
  )
}

export const TodoApp = ({}: { if?: boolean }) => {
  const todoList: ITodoItem[] = [
    {
      desc: 'coding',
      id: '1',
      status: 'Pending',
      importat: true,
    },
    {
      desc: 'sleeping',
      id: '2',
      status: 'Completed',
      importat: true,
    },
    {
      desc: 'learning',
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
  const deleteTask = (todoItem: ITodoItem) => {
    todoItem.status = todoItem.status === 'Completed' ? 'Pending' : 'Completed'
    const index = todoList.findIndex((e) => e === todoItem)
    todoList.splice(index, 1)
    updater()
  }

  portal.provide({
    completeTask,
    deleteTask,
  })

  return {
    greeting() {
      console.log('hello world')
      updater()
    },
    render() {
      return (
        <>
          <div class=" w-80 shadow-lg p-6 rounded-lg">
            <h1 class="my-4 select-none">A simple todo list.</h1>
            <div class="h-50 overflow-y-auto shadow-inner px-4 py-2 rounded-md">
              <Kanban
                status="Pending"
                deleteTask={deleteTask}
                todoList={todoList}
                completeTask={completeTask}
              ></Kanban>
              <Kanban
                deleteTask={deleteTask}
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
