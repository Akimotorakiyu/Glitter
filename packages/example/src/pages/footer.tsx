import { defineView } from '@shrio/shrio'

export const Footer = defineView(() => {
  return (
    <div class="mb-16">
      <div class="text-center">
        <div class="flex justify-center mb-8">
          <img src="/netlify.svg" alt="netlify" />
        </div>
        <p>
          <span class="text-gray-600 text-sm">
            Released under the MIT License
          </span>
        </p>
        <p>
          <span class="text-gray-600 text-sm">Power by Shrio</span>
        </p>
        <p>
          <span class="text-gray-600 text-sm">Copyright © 2021-2021 湫曗</span>
        </p>
      </div>
    </div>
  )
})
