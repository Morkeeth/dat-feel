/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useState } from 'react'

type ThemeType = 'light' | 'dark'
type UiContextType = {
  toggleTheme: () => void
  isDarkTheme: boolean
  themeType: ThemeType
}

const UiContext = createContext<UiContextType>({} as UiContextType)

export const UiContextProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('dark')

  const toggleTheme = () => {
    setThemeType((last) => (last === 'dark' ? 'light' : 'dark'))
  }

  const value = {
    toggleTheme,
    themeType,
    isDarkTheme: themeType === 'dark',
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export const UiContextConsumer = UiContext.Consumer

export const useUiContext = (): UiContextType => {
  const store = useContext(UiContext)
  if (!store) {
    throw new Error('Missing UiContext.Provider')
  }
  return store
}
