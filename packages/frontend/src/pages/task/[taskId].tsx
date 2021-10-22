import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@geist-ui/react'
import TaskPage from '../../components/task/TaskPage'
import SEO from '../../components/SEO'
import { getTask } from '../../utils/web3-requests'
import { TaskContextProvider } from '../../contexts/TaskContext'
import { Task } from '../../types'

const Page: NextPage<{ task: Task }> = ({ task }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Spinner />
  }

  return (
    <>
      <SEO title={`Task id: ${task.id}`} />
      <TaskContextProvider task={task}>
        <TaskPage />
      </TaskContextProvider>
    </>
  )
}

const ids = [1, 2, 3, 4]

export async function getStaticProps(context) {
  return {
    props: {
      taskId: context.params.taskId,
      task: await getTask(context.params.taskId),
    },
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: ids.map((id) => ({
      params: {
        taskId: id.toString(),
      },
    })),

    fallback: true,
  }
}

export default Page
