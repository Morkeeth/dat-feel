import { makeAutoObservable } from 'mobx'
import TaskEntity from './entities/TaskEntity'

type Store = {
  tasks: TaskEntity[]
  setTasks: (tasks: TaskEntity[]) => void
}

export const taskStore = makeAutoObservable<Store>({
  tasks: [],
  setTasks: (tasks: TaskEntity[]) => {
    taskStore.tasks = tasks
  },
})
