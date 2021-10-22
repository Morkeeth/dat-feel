import { request, gql } from 'graphql-request'
import { GovernanceProposals } from '../types'

const query = gql`
  query {
    proposals(where: { status: SUCCEEDED }) {
      id
      proposer {
        id
      }
      data {
        description
      }
    }
  }
`
export const getProposals = async (): Promise<GovernanceProposals[]> => {
  const response = await request(
    'https://api.thegraph.com/subgraphs/name/withtally/tally-testing-v1',
    query
  )

  console.log(response.proposals)

  return response.proposals.map((item) => ({
    id: item.id,
    title: item.data.description,
    proposer: {
      address: item.proposer.id,
    },
  }))
  return response.proposals
}
