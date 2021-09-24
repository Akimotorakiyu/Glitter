import { Header } from './pages/header'
import { Body } from './pages/body'
import { Footer } from './pages/footer'
export function Welcome(...args: unknown[]) {
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
