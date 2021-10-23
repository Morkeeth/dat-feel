/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useState } from 'react'
import TaskEntity from '../stores/entities/TaskEntity'
import { taskStore } from '../stores/taskStore'
import { User } from '../types'

type UserContextType = {
  user: User
  completedTasks: TaskEntity[]
}

const UserContext = createContext<UserContextType>({} as UserContextType)

type Props = {
  user: User
}

export const UserContextProvider: FC<Props> = ({ children, user }) => {
  const completedTasks = taskStore.tasks.filter(
    (task) => task.fullfiller?.toLowerCase() === user.id.toLowerCase()
  )

  const value = { user, completedTasks }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const UserContextConsumer = UserContext.Consumer

export const useUserContext = (): UserContextType => {
  const store = useContext(UserContext)
  if (!store) {
    throw new Error('Missing UserContextType.Provider')
  }
  return store
}
