import { mount } from '@shrio/tsx'
import { Welcome } from './app'

const root = document.getElementById('app')
mount(root!, <Welcome></Welcome>)
