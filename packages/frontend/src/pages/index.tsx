import type { NextPage } from 'next'
import React from 'react'
import HomePage from '../components/home/HomePage'
import SEO from '../components/SEO'

const Page: NextPage = () => {
  return (
    <>
      <SEO title="Create" />
      <HomePage />
    </>
  )
}

export default Page
