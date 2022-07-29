import { defineRouterInfo, defineRouter } from '@glitter/router'

const root = defineRouterInfo({
  home: {
    path: ``,
    children: {
      example: {
        children: {},
        path: 'example',
      },
      component: {
        children: {},
        path: 'component',
      },
    },
  },
})

export const router = defineRouter(root)
console.log(router)
