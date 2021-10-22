import type { NextPage } from 'next'
import React from 'react'
import PortfolioPage from '../../components/portfolio/PortfolioPage'
import SEO from '../../components/SEO'

const Page: NextPage = () => {
  return (
    <>
      <SEO title="Portfolio" />
      <PortfolioPage />
    </>
  )
}

export default Page
