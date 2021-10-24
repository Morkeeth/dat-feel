import { request, gql } from 'graphql-request'
import { defaultBlockParse } from 'simple-markdown'
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
      let title = ''
      let description = ''

      try {
        if (item.data.description) {
          const [asd, ...rest] = item.data.description.split('\n')
          const desc = rest.join('')
          title = asd.replace('# ', '')
          description = desc || ''
          console.log(title, desc)
          // const [first] = defaultBlockParse(item.data.description as string)
          // const tittt = first.content
          //   .map((c) => (typeof c.content === 'string' ? c.content : c.content[0].content))
          //   .join('')
          //   .replace('# ', '')

          // console.log(tittt)
          // console.log(defaultBlockParse(item.data.description as string))
        }
      } catch (e) {
        console.error(e)
      }

      return {
        id: item.id,
        body: description,
        title,
        // body: description,
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
