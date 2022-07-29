import { defineView } from '@glitter/glitter'

export const Footer = defineView(() => {
  return (
    <div class="mb-16">
      <div class="text-center">
        <div class="flex justify-center mb-8">
          <img src="/netlify.svg" alt="netlify" />
        </div>
        <p>
          <span class="text-sm text-gray-600">
            Released under the MIT License
          </span>
        </p>
        <p>
          <span class="text-sm text-gray-600">Power by Gillter</span>
        </p>
        <p>
          <span class="text-sm text-gray-600">Copyright © 2021-2021 湫曗</span>
        </p>
      </div>
    </div>
  )
})
