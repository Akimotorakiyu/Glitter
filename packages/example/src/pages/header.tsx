import { defineView } from '@glitter/glitter'

export const Header = defineView(() => {
  return (
    <div class=" z-10 text-gray-700 font-medium  shadow-dark-200 shadow px-12 py-4 flex justify-around sticky top-0 bg-gray-50">
      <div class="flex-1">
        <span class="hover:text-gray-900">Glitter</span>
      </div>
      <div class="flex-1 flex justify-end">
        <span class="hover:text-gray-900">
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
