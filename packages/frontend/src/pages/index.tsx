import type { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import HomePage from '../components/home/HomePage'
import SEO from '../components/SEO'
import { OrgMetaData } from '../types'

const Page: NextPage<{ org: OrgMetaData }> = ({ org }) => {
  return (
    <>
      <SEO title="Create" />
      <HomePage org={org} />
    </>
  )
}

export async function getStaticProps(context) {
  const { data } = await axios(
    'https://bafybeieucymesdpg36es7syvtoohe4372of4s4xliiaewpgu4mj365grbq.ipfs.infura-ipfs.io/'
  )

  return {
    props: { org: data },
    revalidate: 10, // In seconds
  }
}

export default Page
