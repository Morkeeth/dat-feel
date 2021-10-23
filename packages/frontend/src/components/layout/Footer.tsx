import * as React from 'react'
import { FC } from 'react'
import { Page, Spacer } from '@geist-ui/react'
import ThemeToggle from '../ThemeToggle'

const Footer: FC = () => {
  return (
    <Page.Footer>
      <ThemeToggle />
      <Spacer h={2} />
    </Page.Footer>
  )
}

export default Footer
