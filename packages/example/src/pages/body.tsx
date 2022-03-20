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
    <div class=" mx-4">
      <div class=" py-16">
        <h1 class=" text-center text-5xl font-extrabold my-4 ">
          <span class="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Gillter
          </span>
        </h1>
        <h2 class=" text-center text-2xl font-light my-4">
          A <strong class="font-semibold">modern</strong>{' '}
          <strong class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            vanilla
          </strong>{' '}
          framework
        </h2>
        <div class="text-center">
          <button
            ref={buttonRef}
            onclick={() => {
              // props.show = !props.show
              // updater()
              if (router.router.home.children.example.matched) {
                router.router.home.push({})
              } else {
                router.router.home.children.example.push({})
              }
            }}
            class="text-lg my-8 animate-pulse transition-colors duration-300 ease hover:(bg-green-600) shadow-lg rounded-full bg-green-500  px-4 py-2 text-white"
          >
            <span if={router.router.home.children.example.matched}>Home</span>
            <span if={!router.router.home.children.example.matched}>
              Get Started
            </span>
          </button>
        </div>
        <div class="flex  flex-col items-center">
          <TodoApp
            if={router.router.home.children.example.matched}
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
