import { onCreated, Component, defineView } from '@shrio/shrio'
import { Header } from './pages/header'
import { Body } from './pages/body'
import { Footer } from './pages/footer'
import { ShopWindowView } from './pages/shopwindow/index'
export const Welcome = defineView((props: {}, children, ctx) => {
  onCreated(() => {
    console.log('Welcome created!')
  })
  return (
    <>
      <div class="">
        <Header></Header>

        <Component is={Body}></Component>

        <ShopWindowView></ShopWindowView>

        <Footer></Footer>
      </div>
    </>
  )
})
