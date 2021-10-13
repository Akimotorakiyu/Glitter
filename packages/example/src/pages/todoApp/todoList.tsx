import {
  dynamic,
  useUpdater,
  definePortal,
  onActive,
  onCreated,
  onBeforeUpdated,
  onUpdated,
  onInactive,
  onDestory,
  defineView,
  defineState,
  defineFactory,
} from '@shrio/shrio'

type ITodoItemStatus = 'Pending' | 'Completed'

interface ITodoItem {
  id: string
  desc: string
  status: ITodoItemStatus
  importat: boolean
}

const portal = definePortal<{
  completeTask: (todoItem: ITodoItem) => void
  deleteTask: (todoItem: ITodoItem) => void
  addTask: (todoItem: ITodoItem, callBack: () => void) => void
}>()

const TodoItemView = defineView(({ todoItem }: { todoItem: ITodoItem }) => {
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
            operation.completeTask(todoItem)
          }}
        ></button>
        <span class="ml-4 text-gray-700">{todoItem.desc}</span>
      </div>
      <button
        class={[
          `w-4 h-4 rounded-full bg-red-200 outline-none border-none hover:shadow`,
        ]}
        onclick={() => {
          operation.deleteTask(todoItem)
        }}
      ></button>
    </div>
  )
})
const TodoItemAdd = defineView(() => {
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

const KanbanContainer = defineView(
  ({ title }: { title: string }, childNodes: JSX.Element[]) => {
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
  },
)

const Kanban = defineView(
  ({
    status,
    todoList,
  }: {
    status: ITodoItemStatus
    todoList: ITodoItem[]
  }) => {
    return (
      <KanbanContainer title={status}>
        <>
          {todoList
            .filter((item) => item.status === status)
            .map(
              dynamic((setKey, item) => {
                setKey(item.id)
                return <TodoItemView todoItem={item}></TodoItemView>
              }),
            )}
        </>
      </KanbanContainer>
    )
  },
)

const lifeCycleTest = () => {
  onCreated(() => {
    console.log('onCreated')

    return () => {
      console.log('clean onCreated')
    }
  })

  onDestory(() => {
    console.log('onDestory')
  })

  onInactive(() => {
    console.log('onInactive')

    return () => {
      console.log('clean onActive')
    }
  })

  onActive(() => {
    console.log('onActive')
  })

  onBeforeUpdated(() => {
    console.log('onBeforeUpdated')
    return () => {
      console.log('clean onBeforeUpdated')
    }
  })

  onUpdated(() => {
    console.log('onUpdated')
  })
}

const todoAppStateFactory = defineState(
  (props: { title: string }, children, context) => {
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
      todoItem.status =
        todoItem.status === 'Completed' ? 'Pending' : 'Completed'
      updater()
    }
    const deleteTask = (todoItem: ITodoItem) => {
      todoItem.status =
        todoItem.status === 'Completed' ? 'Pending' : 'Completed'
      const index = todoList.findIndex((e) => e === todoItem)
      todoList.splice(index, 1)
      updater()
    }

    lifeCycleTest()

    portal.provide({
      completeTask,
      deleteTask,
      addTask,
    })

    return [
      {
        ...props,
        todoList,
        updater,
        addTask,
        deleteTask,
        completeTask,
      },
      children,
      context,
    ]
  },
)

export const TodoApp = defineFactory(todoAppStateFactory, (props) => {
  const { title, todoList } = props
  return (
    <>
      <div class=" w-80 shadow-lg p-6 rounded-lg">
        <h1 class="my-4 select-none">{title} A simple todo list.</h1>
        <div class="h-50 overflow-y-auto shadow-inner px-4 py-2 rounded-md">
          <Kanban status="Pending" todoList={todoList}></Kanban>
          <Kanban status="Completed" todoList={todoList}></Kanban>
        </div>
        <div class="my-4">
          <TodoItemAdd></TodoItemAdd>
        </div>
      </div>
    </>
  )
})
