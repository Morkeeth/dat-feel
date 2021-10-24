import { request, gql } from 'graphql-request'
import { GovernanceProposal, GovernanceProposalSource } from '../types'

const tallyQuery = gql`
  query {
    proposals(first: 20) {
      id
      proposer {
        id
      }
      data {
        description
        proposalId
        timestamp
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
  source: GovernanceProposalSource,
  orgName: string
): Promise<GovernanceProposal[]> => {
  const graphUrl =
    orgName === 'compound'
      ? 'https://api.thegraph.com/subgraphs/name/withtally/protocol-compound-v7'
      : 'https://api.thegraph.com/subgraphs/name/withtally/protocol-uniswap-v7'
  const url = source === 'snapshot' ? 'https://hub.snapshot.org/graphql' : graphUrl

  const query = source === 'snapshot' ? snapshotQuery : tallyQuery
  const response = await request(url, query)

  if (source === 'tally') {
    return response.proposals.map((item: any) => {
      const [title, ...rest] = item.data.description.split('\n')
      const description = rest.join('')

      return {
        id: item.id,
        title: title?.replace('# ', '') || description,
        body: description,
        date: new Date(Number(item.data.timestamp) * 1000),
        link: `https://www.withtally.com/governance/compound/proposal/${item.data.proposalId}`,
        proposer: {
          address: item.proposer.id,
        },
      }
    })
  }

  return response.proposals.map((item: any) => ({
    id: item.id,
    title: item.title,
    date: new Date(),
    link: '#',
    proposer: {
      address: item.author,
    },
  }))
}
