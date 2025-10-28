import { defineView } from '@glitter/glitter'
import { htmlElements as h, htsx } from '@glitter/render-dom'

export const Footer = defineView(() => {
  return (
    <h.div class="mb-16">
      <h.div class="text-center">
        <h.div class="flex justify-center mb-8">
          <h.img src="/netlify.svg" alt="netlify" />
        </h.div>
        <h.p>
          <h.span class="text-sm text-gray-600">
            Released under the MIT License
          </h.span>
        </h.p>
        <h.p>
          <h.span class="text-sm text-gray-600">Power by Gillter</h.span>
        </h.p>
        <h.p>
          <h.span class="text-sm text-gray-600">
            Copyright © 2021-2025 湫曗
          </h.span>
        </h.p>
      </h.div>
    </h.div>
  )
})
