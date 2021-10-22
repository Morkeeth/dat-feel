import { makeAutoObservable } from 'mobx'
import { GovernanceProposalSource } from '../types'

type Store = {
  governanceSource: GovernanceProposalSource
  setSource: (source: GovernanceProposalSource) => void
}

export const proposalStore = makeAutoObservable<Store>({
  governanceSource: 'tally',
  setSource: (source: GovernanceProposalSource) => {
    proposalStore.governanceSource = source
  },
})
