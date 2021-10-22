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
  createdAt: string
  completedAt: string
}

export type User = {
  id: string
  ipfsContract: string
  completedTasks: number[]
  applications: number[]
  xp: number
}

export type GovernanceItem = {
  id: string
  body: string
  title: string
}
