import { dynamic, defineView, ViewContext } from '@glitter/glitter'
import { stateSuite } from './state'
import { TodoItemAdd } from './addTodoItem'
import { ITodoItem, ITodoItemStatus } from './type'

const portal = stateSuite
import { htmlElements as h, htsx } from '@glitter/render-dom'

const TodoItemView = defineView(({ todoItem }: { todoItem: ITodoItem }) => {
  const operation = portal.inject()
  return (
    <h.div class="flex items-center justify-between px-4 rounded hover:bg-gray-100 transition-colors duration-300 ease">
      <h.div class="flex items-center ">
        <h.button
          class={[
            `w-4 h-4 rounded-full outline-none border-none hover:shadow`,
            {
              'bg-green-200': todoItem.status === 'Completed',
              'bg-blue-200': todoItem.status === 'Pending',
            },
          ]}
          onclick={() => {
            operation.methods.toggleTaskStatus(todoItem)
          }}
        ></h.button>
        <h.span class="ml-4 text-gray-700">{todoItem.desc}</h.span>
      </h.div>
      <h.button
        class={[
          `w-4 h-4 rounded-full bg-red-200 outline-none border-none hover:shadow`,
        ]}
        onclick={() => {
          operation.methods.deleteTask(todoItem)
        }}
      ></h.button>
    </h.div>
  )
})

const KanbanContainer = defineView(
  ({ title }: { title: string }, childNodes) => {
    return (
      <>
        <h.div class="my-2">
          <>
            <h.h4 class="text-gray-500 select-none my-2">{title}</h.h4>
            <h.div class="mx-2">{childNodes}</h.div>
          </>
        </h.div>
      </>
    )
  },
)

const Kanban = defineView(({ status }: { status: ITodoItemStatus }) => {
  const operation = portal.inject()

  return (
    <KanbanContainer title={status}>
      <>
        {operation.data.todoList
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
})

export const TodoAppView = defineView((props) => {
  const operation = portal.inject()

  return (
    <>
      <h.div class="p-6 rounded-lg shadow-lg  w-80">
        <h.h2 class="my-4 select-none">
          {operation.props.title} A simple todo list.
        </h.h2>
        <h.div class="px-4 py-2 overflow-y-auto shadow-inner h-50 rounded-md">
          <Kanban status="Pending"></Kanban>
          <Kanban status="Completed"></Kanban>
        </h.div>
        <h.div class="my-4">
          <TodoItemAdd></TodoItemAdd>
        </h.div>
      </h.div>
    </>
  )
})

export const TodoApp = defineView((props: { title: string }, children, ctx) => {
  return (
    <ViewContext
      componentStateFactoryProto={stateSuite}
      {...props}
      scope={() => {
        return <TodoAppView></TodoAppView>
      }}
    ></ViewContext>
  )

  /**
   * 简单版本
   */
  return <TodoAppView></TodoAppView>
})
