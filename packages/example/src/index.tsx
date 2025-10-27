import { Welcome } from './app'
import 'virtual:windi.css'
// const root = document.getElementById('app')
import {
  arrangeChildren,
  childNodesSymbol,
  insertBeforeSymbol,
  removeSymbol,
} from '@glitter/glitter'
import { htsx, IGlitterNode } from '@glitter/glitter'

const ele = document.body.querySelector('#app')

Object.defineProperty(ele, childNodesSymbol, {
  get() {
    return this.childNodes
  },
})
Object.defineProperty(ele, removeSymbol, {
  get() {
    return this.remove
  },
})
Object.defineProperty(ele, insertBeforeSymbol, {
  get() {
    return this.insertBefore
  },
})

// mount(root!, <Welcome></Welcome>)
arrangeChildren(ele as unknown as IGlitterNode, [<Welcome></Welcome>])
