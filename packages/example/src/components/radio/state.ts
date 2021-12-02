import { defineStatePortal, defineState, shrioReactive } from '@shrio/shrio'

export const radioStateFactory = defineState(
  (
    props: {
      value: string
      onchange: (value: string) => {}
    },
    children,
    context,
  ) => {
    const state = {
      props,
    }

    portal.provide(state)

    return [state, children, context]
  },
)

export const portal = defineStatePortal(radioStateFactory)
