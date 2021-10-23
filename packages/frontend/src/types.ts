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

export type GovernanceItem = {
  id: string
  body: string
  title: string
}
