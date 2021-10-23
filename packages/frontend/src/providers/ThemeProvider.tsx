import { FC } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useUiContext } from '../contexts/UiContext'

const ThemeProvider: FC = ({ children }) => {
  const { themeType } = useUiContext()

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      {children}
    </GeistProvider>
  )
}

export default ThemeProvider
