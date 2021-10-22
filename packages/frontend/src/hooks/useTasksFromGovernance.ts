import * as React from 'react'
import { FC } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { GovernanceProposals } from '../types'
import { getProposals } from '../utils/api-requests'

const useTasksFromGovernance = (): UseQueryResult<GovernanceProposals[]> => {
  const query = useQuery<GovernanceProposals[]>('proposals', getProposals)

  return query
}

export default useTasksFromGovernance
