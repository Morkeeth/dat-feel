import React, { FC } from 'react'
import Notifications from '../notifications/Notifications'
import Page from '../Page'
import Footer from './Footer'
import Header from './Header'

type Props = {}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Page>
        <Header />
        <main>{children}</main>
        <Notifications />
        <Footer />
      </Page>
    </>
  )
}

export default MainLayout
