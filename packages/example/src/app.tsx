import { Header } from './pages/header'
import { Body } from './pages/body'
import { Footer } from './pages/footer'
import { onCreated } from '@shrio/shrio'
export function Welcome(...args: unknown[]) {
  onCreated(() => {
    console.log('Welcome created!')
  })
  return (
    <>
      <div class="">
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    </>
  )
}
