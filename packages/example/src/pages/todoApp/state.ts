import {
  defineStatePortal,
  defineState,
  useAsyncUpdater,
  useUpdater,
} from '@shrio/shrio'
import { lifeCycleTest } from './lifeCycleTest'
import { ITodoItem } from './type'
import { genTempData } from './tempData'

export const todoAppStateFactory = defineState(
  (props: { title: string }, children, context) => {
    const todoList: ITodoItem[] = genTempData()

    const asyncUpdater = useAsyncUpdater()
    const updater = useUpdater()

    const addTask = (todoItem: ITodoItem, callBack: () => void) => {
      todoList.push(todoItem)
      updater()
      callBack()
    }

    const asyncAddTask = async (todoItem: ITodoItem) => {
      todoList.push(todoItem)
      await asyncUpdater()
      console.log('added', todoItem.desc)
    }

    const completeTask = async (todoItem: ITodoItem) => {
      todoItem.status =
        todoItem.status === 'Completed' ? 'Pending' : 'Completed'
      updater()
    }

    const deleteTask = async (todoItem: ITodoItem) => {
      todoItem.status =
        todoItem.status === 'Completed' ? 'Pending' : 'Completed'
      const index = todoList.findIndex((e) => e === todoItem)
      todoList.splice(index, 1)
      updater()
    }

    lifeCycleTest()

    const state = {
      ...props,
      todoList,
      updater,
      addTask,
      deleteTask,
      completeTask,
      asyncAddTask,
    }

    portal.provide(state)

    return [state, children, context]
  },
)

export const portal = defineStatePortal(todoAppStateFactory)
