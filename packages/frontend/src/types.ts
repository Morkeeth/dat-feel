// To-do: Fix better / more accurate typing

export type Task = {
  id: string
  title: string
  description: string
  status: string
  price: number
  taskValidator: string
  organization: string
  applicants: number[]
  xp: number
  createdAt: string
  completedAt: string
}

export type User = {
  id: string
  ipfsContract: string
  completedTasks: Task[]
  applications: number[]
  xp: number
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
  proposalUrl: string
  level?: string
  compansation: string
}

export type OrgMetaData = {
  name: string
  logo: string
  header: string
  discord: string
  twitter: string
  contractOwner: string
  url: string
}
