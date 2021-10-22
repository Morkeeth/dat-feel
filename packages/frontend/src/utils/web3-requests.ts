import { Task } from '../types'

export const getTask = async (taskId: string): Promise<Task> => {
  return {
    id: taskId,
    title: 'Simple task',
  }
}
