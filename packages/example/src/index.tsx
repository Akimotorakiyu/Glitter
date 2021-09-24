import { mount } from '@shrio/tsx'
import { Welcome } from './app'
import 'virtual:windi.css'
const root = document.getElementById('app')
mount(root!, <Welcome></Welcome>)
