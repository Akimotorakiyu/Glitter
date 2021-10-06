import { Welcome } from './app'
import 'virtual:windi.css'
// const root = document.getElementById('app')
import { arrangeChildren, getNode } from '@shrio/shrio'

// mount(root!, <Welcome></Welcome>)
arrangeChildren(document.body, [getNode(<Welcome></Welcome>)])
