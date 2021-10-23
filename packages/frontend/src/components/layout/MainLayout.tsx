import React, { FC } from 'react'
import Footer from './Footer'
import Header from './Header'
import Page from '../Page'

type Props = {}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Page>
        <Header />
        <main>{children}</main>
        <Footer />
      </Page>
    </>
  )
}

export default MainLayout
