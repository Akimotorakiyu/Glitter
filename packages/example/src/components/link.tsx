import { defineView } from '@glitter/glitter'

interface ITextProps {
  onclick?: () => void | Promise<void>
  class?: string
}

import { htmlElements as h, htsx } from '@glitter/render-dom'

export const TextViewLight = defineView((props: ITextProps, children) => {
  return (
    <h.span
      class={`px-4 py-2 text-white  bg-green-400 rounded-md hover:(shadow-green-600 bg-green-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </h.span>
  )
})

export const TextViewBlue = defineView((props: ITextProps, children) => {
  return (
    <h.span
      class={`px-4 py-2 text-white bg-blue-400 rounded-md hover:(shadow-blue-600 bg-blue-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </h.span>
  )
})
export const TextViewRed = defineView((props: ITextProps, children) => {
  return (
    <h.span
      class={`px-4 py-2 text-white bg-red-400 rounded-md hover:(shadow-red-600 bg-red-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </h.span>
  )
})
export const TextViewOrange = defineView((props: ITextProps, children) => {
  return (
    <h.span
      class={`px-4 py-2 text-white bg-orange-400 rounded-md hover:(shadow-orange-600 bg-orange-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </h.span>
  )
})
export const TextViewGray = defineView((props: ITextProps, children) => {
  return (
    <h.span
      class={`px-4 py-2 text-white bg-gray-400 rounded-md hover:(shadow-gray-600 bg-gray-600) transition${
        props.class ?? ''
      }`}
    >
      {children}
    </h.span>
  )
})
