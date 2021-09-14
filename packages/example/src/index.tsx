import '@shrio/tsx'
import { Welcome } from './app'

const root = document.getElementById('app')
root?.appendChild((<Welcome></Welcome>) as Node)
