import type { NextPage } from 'next'
import React from 'react'
import BoardPage from '../components/board/BoardPage'
import SEO from '../components/SEO'

const Page: NextPage = () => {
  return (
    <>
      <SEO title="Create" />
      <BoardPage />
    </>
  )
}

export default Page
