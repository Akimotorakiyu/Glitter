import { Welcome } from './app'
import 'virtual:windi.css'
// const root = document.getElementById('app')
import { arrangeChildren } from '@glitter/glitter'
import { renderToHtml } from '@glitter/render-dom'
renderToHtml()
// mount(root!, <Welcome></Welcome>)
arrangeChildren(document.body as unknown as IGlitterNode, [<Welcome></Welcome>])
