import { onCreated, Component, defineView, htsx } from '@glitter/glitter'
import { Header } from './pages/header'
import { Body } from './pages/body'
import { Footer } from './pages/footer'
import { ShopWindowView } from './pages/shopwindow/index'
import { router } from './pages/router'

import { htmlElements } from '@glitter/render-dom'

const { div: Div } = htmlElements

export const Welcome = defineView(() => {
  onCreated(() => {
    console.log('Welcome created!')
  })
  return (
    <>
      <Div class="">
        <Header></Header>

        <Component is={Body}></Component>

        <ShopWindowView
          if={router.router.home.children.component.matched}
        ></ShopWindowView>

        <Footer></Footer>
      </Div>
    </>
  )
})
