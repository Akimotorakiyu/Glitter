import { defineView } from '@glitter/glitter'
import { router } from './router'

export const Header = defineView(() => {
  return (
    <div class=" z-10 text-gray-600 font-medium   shadow px-12 py-4 flex justify-around sticky top-0 bg-gray-50">
      <div class="flex-1">
        <span
          class="hover:(text-green-600) mr-4 cursor-pointer"
          onclick={() => {
            router.router.home.push({})
          }}
        >
          Glitter
        </span>
        <span
          class="hover:text-green-600 mr-2 cursor-pointer"
          onclick={() => {
            router.router.home.children.example.push({})
          }}
        >
          Example
        </span>
        <span
          class="hover:text-green-600 mr-2 cursor-pointer"
          onclick={() => {
            router.router.home.children.component.push({})
          }}
        >
          Component
        </span>
      </div>
      <div class="flex-1 flex justify-end">
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
