import { defineView } from '@shrio/shrio'

interface IImageViewProps {
  onclick?: () => void | Promise<void>
  src?: string
  class?: string
}

export const ImageView = defineView((props: IImageViewProps, children) => {
  return (
    <div class="inline-flex items-center">
      <img class={`${props.class ?? ''}`} src={props.src}>
        {children}
      </img>
    </div>
  )
})
