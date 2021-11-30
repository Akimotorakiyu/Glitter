import {
  dynamic,
  defineFactory,
  defineStateView,
  defineState,
  defineView,
} from '@shrio/shrio'

interface ITextProps {
  onclick?: () => void | Promise<void>
  class?: string
}

export const TextViewBlack = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-gray-800 leading-6 ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const TextViewBlue = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-blue-800  leading-6  ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const TextViewRed = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-red-800 leading-6  ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const TextViewGreen = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-green-800 leading-6  ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const TextViewOrange = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-orange-800 leading-6  ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const TextViewGray = defineView((props: ITextProps, children) => {
  return (
    <span
      class={`inline-flex items-center text-gray-500 leading-6  ${
        props.class ?? ''
      }`}
    >
      {children}
    </span>
  )
})

export const ParagraphTextView = defineView((props: ITextProps, children) => {
  return (
    <p
      class={`flex text-gray-800  items-center leading-6  flex-wrap ${
        props.class ?? ''
      }`}
    >
      {children}
    </p>
  )
})
