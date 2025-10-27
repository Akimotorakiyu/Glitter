import {
  createRef,
  Component,
  useUpdater,
  defineFactoryComponentStateFactory,
  defineFactoryComponent,
} from '@glitter/glitter'
import { TodoApp } from './todoApp/todoList'
import { router } from './router'
import { htmlElements as h, htsx } from '@glitter/render-dom'

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
    <h.div class="mx-4 ">
      <h.div class="py-16 ">
        <h.h1 class="my-4 text-5xl font-extrabold text-center ">
          <h.span class="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
            Gillter
          </h.span>
        </h.h1>
        <h.h2 class="my-4 text-2xl font-light text-center ">
          A <h.strong class="font-semibold">modern</h.strong>{' '}
          <h.strong class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            vanilla
          </h.strong>{' '}
          framework
        </h.h2>
        <h.div class="flex flex-col items-center ">
          <TodoApp
            if={router.router.home.matched}
            title="☃️"
            keepAlive
            ref={todoAppRef}
          ></TodoApp>
        </h.div>
      </h.div>
    </h.div>
  )
})

export const Body = BodyView
