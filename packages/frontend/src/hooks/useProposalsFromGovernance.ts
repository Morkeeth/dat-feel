import { useQuery, UseQueryResult } from 'react-query'
import { proposalStore } from '../stores/proposalStore'
import { GovernanceProposal } from '../types'
import { getProposals } from '../utils/api-requests'

const useProposalsFromGovernance = (orgName: string): UseQueryResult<GovernanceProposal[]> => {
  const query = useQuery<GovernanceProposal[]>(`proposals-${proposalStore.governanceSource}`, () =>
    getProposals(proposalStore.governanceSource, orgName)
  )

  return query
}

export default useProposalsFromGovernance
