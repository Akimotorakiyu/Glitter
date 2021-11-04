export type ITodoItemStatus = 'Pending' | 'Completed'

export interface ITodoItem {
  id: string
  desc: string
  status: ITodoItemStatus
}
