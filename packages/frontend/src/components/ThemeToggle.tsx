import * as React from 'react'
import { FC } from 'react'
import { Toggle } from '@geist-ui/react'
import { useUiContext } from '../contexts/UiContext'

const ThemeToggle: FC = () => {
  const { isDarkTheme, toggleTheme } = useUiContext()
  return <Toggle type="secondary" checked={isDarkTheme} onChange={() => toggleTheme()} />
}

export default ThemeToggle
