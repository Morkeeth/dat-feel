export type Task = {
  id: string
  title: string
}

type Proposer = {
  address: string
}

export type GovernanceProposal = {
  id: string
  body?: string
  title: string
  proposer: Proposer
}

export type GovernanceProposalSource = 'tally' | 'snapshot'

export type TaskCreationDataArgs = {
  title: string
  body: string
}
