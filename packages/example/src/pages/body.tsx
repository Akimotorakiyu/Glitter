import { TodoApp } from './todoApp/todoList'
export const Body = () => {
  return (
    <div class=" mx-4">
      <div class=" py-16">
        <h1 class=" text-center text-5xl font-extrabold my-4">Shrio</h1>
        <h2 class=" text-center text-2xl font-light my-4">
          A <strong class="font-semibold">modern</strong>{' '}
          <strong class="font-semibold">vanilla</strong> front-end framework,
          for <strong class="font-semibold">building UI</strong> on the web.
        </h2>
        <div class="text-center">
          <button class="text-lg my-8 animate-pulse transition-colors duration-300 ease hover:(bg-green-600) shadow-lg rounded-full bg-green-500  px-4 py-2 text-white">
            Get Started
          </button>
        </div>
        <div class="flex justify-center">
          <TodoApp></TodoApp>
        </div>
      </div>
    </div>
  )
}