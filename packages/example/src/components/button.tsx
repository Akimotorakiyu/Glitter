import { defineView } from '@glitter/glitter'
import { htmlElements } from '@glitter/render-dom'

const { button } = htmlElements

const Button = button

interface IButtonProps {
  onclick?: () => void | Promise<void>
  class?: string
}
import { htmlElements as h, htsx } from '@glitter/render-dom'

export const ButtonViewLight = defineView((props: IButtonProps, children) => {
  return (
    <htmlElements.button
      class={`px-4 py-2 text-white  bg-green-400 rounded-md hover:(shadow-green-600 bg-green-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </htmlElements.button>
  )
})

export const ButtonViewBlue = defineView((props: IButtonProps, children) => {
  return (
    <Button
      class={`px-4 py-2 text-white bg-blue-400 rounded-md hover:(shadow-blue-600 bg-blue-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </Button>
  )
})
export const ButtonViewRed = defineView((props: IButtonProps, children) => {
  return (
    <Button
      class={`px-4 py-2 text-white bg-red-400 rounded-md hover:(shadow-red-600 bg-red-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </Button>
  )
})
export const ButtonViewOrange = defineView((props: IButtonProps, children) => {
  return (
    <Button
      class={`px-4 py-2 text-white bg-orange-400 rounded-md hover:(shadow-orange-600 bg-orange-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </Button>
  )
})
export const ButtonViewGray = defineView((props: IButtonProps, children) => {
  return (
    <Button
      class={`px-4 py-2 text-white bg-gray-400 rounded-md hover:(shadow-gray-600 bg-gray-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </Button>
  )
})

export const ButtonView = defineView((props: IButtonProps, children) => {
  return (
    <Button
      class={`inline-flex items-center justify-center px-4 py-2 rounded-md  transition${
        props.class ?? ''
      }`}
    >
      {children}
    </Button>
  )
})
