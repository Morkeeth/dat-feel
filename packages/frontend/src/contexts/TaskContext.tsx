/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useState } from 'react'
import { Task } from '../types'

type TaskContextType = {
  task: Task
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType)

type Props = {
  task: Task
}

export const TaskContextProvider: FC<Props> = ({ children, task }) => {
  const value = { task }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const TaskContextConsumer = TaskContext.Consumer

export const useTaskContext = (): TaskContextType => {
  const store = useContext(TaskContext)
  if (!store) {
    throw new Error('Missing TaskContext.Provider')
  }
  return store
}
