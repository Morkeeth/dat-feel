import { useQuery, UseQueryResult } from 'react-query'
import { proposalStore } from '../stores/proposalStore'
import { GovernanceProposal } from '../types'
import { getProposals } from '../utils/api-requests'

const useProposalsFromGovernance = (): UseQueryResult<GovernanceProposal[]> => {
  const query = useQuery<GovernanceProposal[]>(`proposals-${proposalStore.governanceSource}`, () =>
    getProposals(proposalStore.governanceSource)
  )

  return query
}

export default useProposalsFromGovernance
