import { ITodoItem } from './type'

export const genTempData = () => {
  const todoList: ITodoItem[] = [
    {
      desc: 'coding',
      id: '1',
      status: 'Pending',
      importat: true,
    },
    {
      desc: 'sleeping',
      id: '2',
      status: 'Completed',
      importat: true,
    },
    {
      desc: 'learning',
      id: '3',
      status: 'Pending',
      importat: true,
    },
  ]

  return todoList
}
