import '@shrio/tsx'
import { Welcome } from './app'

const root = document.getElementById('app')
console.log('root', root, <Welcome></Welcome>)
root?.appendChild((<Welcome></Welcome>) as Node)
