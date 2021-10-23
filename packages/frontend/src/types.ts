import { BigNumber } from 'ethers'
import { TaskStatus } from '../src/config/enums'

// To-do: Fix better / more accurate typing
type Markdown = string

export type Task = {
  approvers: string[]
  id: string
  status: TaskStatus
  creator: string
  deadline: BigNumber
  issuers: string[]
  token: string
  _tokenVersion: BigNumber
  amount: BigNumber
  contributationId: BigNumber
  data?: {
    title: string
    body: string
    proposalUrl: string
  }
}

export type User = {
  id: string
  ipfsContract: string
  completedTasks: Task[]
  applications: number[]
  xp: number
  bio: Markdown
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
  owner: string
  url: string
  contributors: number
  tvl: string
  tasks: number
}
