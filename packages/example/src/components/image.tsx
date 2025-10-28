import { defineView } from '@glitter/glitter'

interface IImageViewProps {
  onclick?: () => void | Promise<void>
  src?: string
  class?: string
}

import { htmlElements as h, htsx } from '@glitter/render-dom'

export const ImageView = defineView((props: IImageViewProps, children) => {
  return (
    <h.div class="inline-flex items-center">
      <h.img class={`${props.class ?? ''}`} src={props.src}>
        {children}
      </h.img>
    </h.div>
  )
})
