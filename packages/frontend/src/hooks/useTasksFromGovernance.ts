import * as React from 'react'
import { FC } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { GovernanceItem } from '../types'
import { getGovernanceTasks } from '../utils/api-requests'

const useTasksFromGovernance = (): UseQueryResult<GovernanceItem[]> => {
  const query = useQuery<GovernanceItem[]>('governanceTasks', getGovernanceTasks)

  return query
}

export default useTasksFromGovernance
