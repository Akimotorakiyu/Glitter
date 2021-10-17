import { definePortal } from '@shrio/shrio'
import { ITodoItem } from './type'

export const portal = definePortal<{
  completeTask: (todoItem: ITodoItem) => void
  deleteTask: (todoItem: ITodoItem) => void
  addTask: (todoItem: ITodoItem, callBack: () => void) => void
  asyncAddTask: (todoItem: ITodoItem) => void
}>()
