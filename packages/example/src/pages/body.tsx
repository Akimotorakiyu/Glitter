import {
  createRef,
  Component,
  useUpdater,
  defineFactoryComponentStateFactory,
  defineFactoryComponent,
} from '@glitter/glitter'
import { TodoApp } from './todoApp/todoList'
import { router } from './router'
const bodyStateFactory = defineFactoryComponentStateFactory(
  (props, children, context) => {
    const updater = useUpdater()
    const buttonRef = createRef<HTMLButtonElement>()
    const todoAppRef = createRef(TodoApp)
    let show = true

    return { updater, buttonRef, todoAppRef, show }
  },
)

export const BodyView = defineFactoryComponent(bodyStateFactory, (props) => {
  const { todoAppRef, updater, show, buttonRef } = props

  return (
    <div class="mx-4 ">
      <div class="py-16 ">
        <h1 class="my-4 text-5xl font-extrabold text-center ">
          <span class="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
            Gillter
          </span>
        </h1>
        <h2 class="my-4 text-2xl font-light text-center ">
          A <strong class="font-semibold">modern</strong>{' '}
          <strong class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            vanilla
          </strong>{' '}
          framework
        </h2>
        <div class="flex flex-col items-center ">
          <TodoApp
            if={router.router.home.matched}
            title="☃️"
            keepAlive
            ref={todoAppRef}
          ></TodoApp>
        </div>
      </div>
    </div>
  )
})

export const Body = BodyView
