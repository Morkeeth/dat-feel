import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@geist-ui/react'
import PortfolioPage from '../../components/portfolio/PortfolioPage'
import SEO from '../../components/SEO'
import { getUser } from '../../utils/web3-requests'
import { UserContextProvider } from '../../contexts/UserContext'
import { User } from '../../types'

const Page: NextPage<{ user: User }> = ({ user }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Spinner />
  }

  return (
    <>
      <SEO title={`User id: ${user.id}`} />
      <UserContextProvider user={user}>
        <PortfolioPage />
      </UserContextProvider>
    </>
  )
}

const ids = [1, 2, 3, 4]

export async function getStaticProps(context) {
  return {
    props: {
      userId: context.params.userId,
      user: await getUser(context.params.userId),
    },
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: ids.map((id) => ({
      params: {
        userId: id.toString(),
      },
    })),

    fallback: true,
  }
}

export default Page
