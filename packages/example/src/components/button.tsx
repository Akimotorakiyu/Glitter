import { defineView } from '@shrio/shrio'

interface IButtonProps {
  onclick?: () => void | Promise<void>
  class?: string
}

export const ButtonViewLight = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`px-4 py-2 text-white  bg-green-400 rounded-md hover:(shadow-green-600 bg-green-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})

export const ButtonViewBlue = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`px-4 py-2 text-white bg-blue-400 rounded-md hover:(shadow-blue-600 bg-blue-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})
export const ButtonViewRed = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`px-4 py-2 text-white bg-red-400 rounded-md hover:(shadow-red-600 bg-red-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})
export const ButtonViewOrange = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`px-4 py-2 text-white bg-orange-400 rounded-md hover:(shadow-orange-600 bg-orange-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})
export const ButtonViewGray = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`px-4 py-2 text-white bg-gray-400 rounded-md hover:(shadow-gray-600 bg-gray-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})

export const ButtonView = defineView((props: IButtonProps, children) => {
  return (
    <button
      class={`inline-flex items-center justify-center px-4 py-2 rounded-md  transition${
        props.class ?? ''
      }`}
    >
      {children}
    </button>
  )
})
