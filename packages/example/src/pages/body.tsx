import {
  createRef,
  Component,
  useUpdater,
  defineState,
  defineStateView,
  defineFactoryComponent,
} from '@shrio/shrio'
import { TodoApp } from './todoApp/todoList'

const bodyStateFactory = defineState((props, children, context) => {
  const updater = useUpdater()
  const buttonRef = createRef<HTMLButtonElement>()
  const todoAppRef = createRef(TodoApp)
  let show = true

  return { updater, buttonRef, todoAppRef, show }
})

export const BodyView = defineStateView(bodyStateFactory, (props) => {
  const { todoAppRef, updater, show, buttonRef } = props
  return (
    <div class=" mx-4">
      <div class=" py-16">
        <h1 class=" text-center text-5xl font-extrabold my-4">Shrio</h1>
        <h2 class=" text-center text-2xl font-light my-4">
          A <strong class="font-semibold">modern</strong>{' '}
          <strong class="font-semibold">vanilla</strong> front-end framework,
          for{' '}
          <Component is="strong" class="font-semibold">
            building UI
          </Component>{' '}
          on the web.
        </h2>
        <div class="text-center">
          <button
            ref={buttonRef}
            onclick={() => {
              props.show = !props.show
              updater()
            }}
            class="text-lg my-8 animate-pulse transition-colors duration-300 ease hover:(bg-green-600) shadow-lg rounded-full bg-green-500  px-4 py-2 text-white"
          >
            Get Started
          </button>
        </div>
        <div class="flex  flex-col items-center">
          <TodoApp if={show} title="☃️" keepAlive ref={todoAppRef}></TodoApp>
        </div>
      </div>
    </div>
  )
})

export const Body = defineFactoryComponent(bodyStateFactory, BodyView)
