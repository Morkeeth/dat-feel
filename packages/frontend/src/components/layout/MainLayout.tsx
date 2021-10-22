import React, { FC } from 'react'
import Footer from './Footer'
import Header from './Header'
import Notifications from '../notifications/Notifications'
import Page from '../Page'

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
