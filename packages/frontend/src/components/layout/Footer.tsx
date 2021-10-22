import * as React from 'react'
import { FC } from 'react'
import { Page, Spacer, Toggle } from '@geist-ui/react'
import { useUiContext } from '../../contexts/UiContext'

type Props = {}

const Footer: FC<Props> = () => {
  const { isDarkTheme, toggleTheme } = useUiContext()
  return (
    <Page.Footer>
      <Toggle type="secondary" checked={isDarkTheme} onChange={() => toggleTheme()} />
      <Spacer h={2} />
    </Page.Footer>
  )
}

export default Footer
