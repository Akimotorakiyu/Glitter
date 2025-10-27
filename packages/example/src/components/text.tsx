import { defineView } from '@glitter/glitter'

interface ITextProps {
  onclick?: () => void | Promise<void>
  class?: string
}

import { htmlElements as h, htsx } from '@glitter/render-dom'

export const TextViewWhite = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-white ${props.class ?? ''}`}>{children}</TextView>
  )
})

export const TextViewBlack = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-gray-800  ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const TextViewBlue = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-blue-800   ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const TextViewRed = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-red-800  ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const TextViewGreen = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-green-800  ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const TextViewOrange = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-orange-800  ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const TextViewGray = defineView((props: ITextProps, children) => {
  return (
    <TextView class={` text-gray-500  ${props.class ?? ''}`}>
      {children}
    </TextView>
  )
})

export const defalutInlineStyle = 'inline-flex items-center'
/**
 * Basic TextView
 */
export const TextView = defineView((props: ITextProps, children) => {
  return (
    <h.span class={`inline-flex items-center leading-6 ${props.class ?? ''}`}>
      {children}
    </h.span>
  )
})

export const ParagraphView = defineView((props: ITextProps, children) => {
  return (
    <h.p class={`flex items-center leading-6  flex-wrap ${props.class ?? ''}`}>
      {children}
    </h.p>
  )
})
