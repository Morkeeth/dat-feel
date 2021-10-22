export type Task = {
  id: string
  title: string
}

type Proposer = {
  account: string
}

export type GovernanceProposals = {
  id: string
  body?: string
  title: string
  proposer: Proposer
}
