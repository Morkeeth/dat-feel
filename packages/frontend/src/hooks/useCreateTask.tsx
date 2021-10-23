import { useToasts } from '@geist-ui/react'
import { TaskCreationDataArgs } from '../types'
import { taskStore } from '../stores/taskStore'

const useCreateTask = () => {
  const [, setToast] = useToasts()

  return {
    create: async (args: TaskCreationDataArgs) => {
      const { error } = await taskStore.createTask(args)
      if (error) {
        setToast({
          type: 'error',
          text: error.message,
        })
      }
    },
    isCreating: taskStore.isCreating,
  }
}

export default useCreateTask
