import { useUpdater, dynamic } from '@shrio/tsx'
import { Header } from './pages/header'
import { Body } from './pages/body'
export function Welcome(...args: unknown[]) {
  const updater = useUpdater()

  return (
    <>
      <div class="">
        <Header></Header>
        <Body></Body>
      </div>
    </>
  )
}
