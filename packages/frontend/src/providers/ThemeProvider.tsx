import { FC } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useUiContext } from '../contexts/UiContext'

type Props = {}

const ThemeProvider: FC<Props> = ({ children }) => {
  const { themeType } = useUiContext()

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      {children}
    </GeistProvider>
  )
}

export default ThemeProvider
