import {
  defineFactoryComponentStateFactory,
  glitterReactive,
} from '@glitter/glitter'
import { lifeCycleTest } from './lifeCycleTest'
import { ITodoItem } from './type'
import { genTempData } from './tempData'

export const stateSuite = defineFactoryComponentStateFactory(
  (props: { title: string }, children, context) => {
    const todoList: ITodoItem[] = glitterReactive(genTempData())

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
      const index = todoList.findIndex((e) => {
        return e === todoItem
      })
      todoList.splice(index, 1)
    }

    lifeCycleTest()

    const state = {
      props,
      methods: {
        addTask,
        deleteTask,
        toggleTaskStatus,
      },
      data: {
        todoList,
      },
    }

    return state
  },
)
