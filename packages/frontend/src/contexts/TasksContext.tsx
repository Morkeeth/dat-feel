/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useState } from 'react'
import { useToasts } from '@geist-ui/react'
import { TaskCreationDataArgs } from '../types'
import { ipfsClient } from '../utils/ipfs'

type TasksContextType = {
  isCreating: boolean
  createTask: (args: TaskCreationDataArgs) => Promise<void>
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType)

export const TasksContextProvider: FC = ({ children }) => {
  const [, setToast] = useToasts()
  const [isCreating, setIsCreating] = useState(false)

  const createTask = async (args: TaskCreationDataArgs) => {
    setIsCreating(true)
    const { title, body } = args
    console.log({ title, body })
    const data = JSON.stringify({
      title,
      body,
    })

    try {
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
    } catch (e: any) {
      console.error(e)
      setToast({
        type: 'error',
        text: e.message,
      })
    } finally {
      setIsCreating(false)
    }
  }

  const value = { createTask, isCreating }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const TasksContextConsumer = TasksContext.Consumer

export const useTasksContext = (): TasksContextType => {
  const store = useContext(TasksContext)
  if (!store) {
    throw new Error('Missing TasksContext.Provider')
  }
  return store
}
