/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useState } from 'react'
import { User } from '../types'

type UserContextType = {
  user: User
}

const UserContext = createContext<UserContextType>({} as UserContextType)

type Props = {
  user: User
}

export const UserContextProvider: FC<Props> = ({ children, user }) => {
  const value = { user }

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
