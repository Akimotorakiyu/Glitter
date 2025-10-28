import { defineView } from '@glitter/glitter'
import { router } from './router'
import { htmlElements as h, htsx } from '@glitter/render-dom'

export const Header = defineView(() => {
  return (
    <h.div class="sticky top-0 z-10 flex justify-around px-12 py-4 font-medium text-gray-600 shadow  bg-gray-50">
      <h.div class="flex-1">
        <h.button
          class={`hover:(text-green-400) mr-4 cursor-pointer ${
            router.router.home.matched ? `text-green-600` : ``
          }`}
          onclick={() => {
            router.router.home.push({})
          }}
        >
          Glitter
        </h.button>
        <h.button
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
        </h.button>
      </h.div>
      <h.div class="flex justify-end flex-1">
        <h.span class="hover:(text-green-600)">
          <h.a
            href="https://github.com/Akimotorakiyu/glitter.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </h.a>
        </h.span>
      </h.div>
    </h.div>
  )
})
