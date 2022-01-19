import { Welcome } from './app'
import 'virtual:windi.css'
// const root = document.getElementById('app')
import { arrangeChildren } from '@shrio/shrio'
import { renderToHtml } from '@shrio/render-dom'
renderToHtml()
// mount(root!, <Welcome></Welcome>)
arrangeChildren(document.body as unknown as IShrioNode, [<Welcome></Welcome>])
