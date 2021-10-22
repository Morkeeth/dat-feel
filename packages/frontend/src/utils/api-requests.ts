import { request, gql } from 'graphql-request'
import { GovernanceItem } from '../types'

const query = gql`
  query Proposals {
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
export const getGovernanceTasks = async (): Promise<GovernanceItem[]> => {
  const response = await request('https://hub.snapshot.org/graphql', query)

  return response.proposals
}
