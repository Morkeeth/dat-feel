import { request, gql } from 'graphql-request'
import { GovernanceProposal, GovernanceProposalSource } from '../types'

const tallyQuery = gql`
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

const snapshotQuery = gql`
  query {
    proposals(
      first: 20
      skip: 0
      where: { space_in: ["balancer", "yam.eth"], state: "closed" }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
    }
  }
`

export const getProposals = async (
  source: GovernanceProposalSource
): Promise<GovernanceProposal[]> => {
  const url =
    source === 'snapshot'
      ? 'https://hub.snapshot.org/graphql'
      : 'https://api.thegraph.com/subgraphs/name/withtally/tally-testing-v1'

  const query = source === 'snapshot' ? snapshotQuery : tallyQuery
  const response = await request(url, query)

  if (source === 'tally') {
    return response.proposals.map((item: any) => ({
      id: item.id,
      title: item.data.description,
      proposer: {
        address: item.proposer.id,
      },
    }))
  }

  return response.proposals.map((item: any) => ({
    id: item.id,
    title: item.title,
    proposer: {
      address: item.author,
    },
  }))
}
