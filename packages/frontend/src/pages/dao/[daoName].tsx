import { Spinner } from '@geist-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FC } from 'react'
import DAOPage from '../../components/dao/DAOPage'
import SEO from '../../components/SEO'
import { organizations } from '../../config/config'
import { OrgMetaData } from '../../types'
import { getDAO } from '../../utils/web3-requests'

type Props = {
  org: OrgMetaData
}

const Page: FC<Props> = ({ org }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Spinner />
  }

  if (!org) {
    return <h1>Nothing here....</h1>
  }

  return (
    <>
      <SEO title={`DAO: ${org.name}`} />
      <DAOPage org={org} />
    </>
  )
}

export async function getStaticProps(context) {
  let org = null

  try {
    const match = organizations.find((o) => o.url === context.params.daoName) || {}
    org = await getDAO(match)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      daoName: context.params.daoName,
      org,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default Page
