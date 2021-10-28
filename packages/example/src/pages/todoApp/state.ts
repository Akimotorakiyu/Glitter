import { defineStatePortal, defineState, shrioReactive } from '@shrio/shrio'
import { lifeCycleTest } from './lifeCycleTest'
import { ITodoItem } from './type'
import { genTempData } from './tempData'

export const todoAppStateFactory = defineState(
  (props: { title: string }, children, context) => {
    const todoList: ITodoItem[] = shrioReactive(genTempData())

    const addTask = (todoItem: ITodoItem, callBack: () => void) => {
      todoList.push(todoItem)
      callBack()
    }

    const completeTask = async (todoItem: ITodoItem) => {
      todoItem.status =
        todoItem.status === 'Completed' ? 'Pending' : 'Completed'
    }

    const deleteTask = async (todoItem: ITodoItem) => {
      const index = todoList.findIndex((e) => e === todoItem)
      todoList.splice(index, 1)
    }

    lifeCycleTest()

    const state = {
      ...props,
      todoList,
      addTask,
      deleteTask,
      completeTask,
    }

    portal.provide(state)

    return [state, children, context]
  },
)

export const portal = defineStatePortal(todoAppStateFactory)
