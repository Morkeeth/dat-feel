import { useTasksContext } from '../contexts/TasksContext'

const useTasks = () => {
  const { tasks, isFetching } = useTasksContext()

  return {
    tasks,
    loading: isFetching,
  }
}

export default useTasks
