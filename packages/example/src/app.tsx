import { Header } from './pages/header'
import { Body } from './pages/body'
import { Footer } from './pages/footer'
import { onCreated, Component } from '@shrio/shrio'

export function Welcome(...args: unknown[]) {
  onCreated(() => {
    console.log('Welcome created!')
  })
  return (
    <>
      <div class="">
        <Header></Header>

        <Component is={Body}></Component>

        <Footer></Footer>
      </div>
    </>
  )
}
