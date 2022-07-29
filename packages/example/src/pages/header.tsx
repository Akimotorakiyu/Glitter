import { defineView } from '@glitter/glitter'
import { router } from './router'

export const Header = defineView(() => {
  return (
    <div class="sticky top-0 z-10 flex justify-around px-12 py-4 font-medium text-gray-600 shadow  bg-gray-50">
      <div class="flex-1">
        <button
          class={`hover:(text-green-400) mr-4 cursor-pointer ${
            router.router.home.matched ? `text-green-600` : ``
          }`}
          onclick={() => {
            router.router.home.push({})
          }}
        >
          Glitter
        </button>
        <button
          class={`mr-2 cursor-pointer hover:text-green-400 ${
            router.router.home.children.example.matched ? `text-green-600` : ``
          }`}
          onclick={() => {
            router.router.home.children.example.push({})
          }}
        >
          Example
        </button>
        <button
          class={`mr-2 cursor-pointer hover:text-green-400 ${
            router.router.home.children.component.matched
              ? `text-green-600`
              : ``
          }`}
          onclick={() => {
            router.router.home.children.component.push({})
          }}
        >
          Component
        </button>
      </div>
      <div class="flex justify-end flex-1">
        <span class="hover:(text-green-600)">
          <a
            href="https://github.com/Akimotorakiyu/glitter.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </span>
      </div>
    </div>
  )
})
