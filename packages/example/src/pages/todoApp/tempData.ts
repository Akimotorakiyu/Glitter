import { ITodoItem } from './type'

export const genTempData = () => {
  const todoList: ITodoItem[] = [
    {
      desc: 'coding',
      id: '1',
      status: 'Pending',
    },
    {
      desc: 'sleeping',
      id: '2',
      status: 'Completed',
    },
    {
      desc: 'learning',
      id: '3',
      status: 'Pending',
    },
  ]

  return todoList
}
