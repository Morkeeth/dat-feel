import type { NextPage } from 'next'
import React from 'react'
import TaskPage from '../../components/task/TaskPage'
import SEO from '../../components/SEO'

const Page: NextPage = () => {
  return (
    <>
      <SEO title="Task id:" />
      <TaskPage />
    </>
  )
}

export default Page
