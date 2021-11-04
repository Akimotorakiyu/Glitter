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

    const toggleTaskStatus = async (todoItem: ITodoItem) => {
      if (todoItem.status === 'Completed') {
        todoItem.status = 'Pending'
      } else {
        todoItem.status = 'Completed'
      }
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
      toggleTaskStatus,
    }

    portal.provide(state)

    return [state, children, context]
  },
)

export const portal = defineStatePortal(todoAppStateFactory)
