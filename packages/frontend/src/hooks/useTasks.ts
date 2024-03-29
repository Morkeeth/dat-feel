import { useEffect, useState } from 'react'
import { StandardBounties__factory } from '../generated/types'
import TaskEntity from '../stores/entities/TaskEntity'
import { taskStore } from '../stores/taskStore'
import useAddress from '../web3/useAddress'
import useWeb3 from '../web3/useWeb3'

const useTasks = (owner?: string) => {
  let tasks = taskStore.tasks
  const users = taskStore.users

  if (owner) {
    tasks = tasks.filter((task) => task.creator === owner)
  }

  return {
    tasks,
    users,
    loading: taskStore.isFetching,
  }
}

export default useTasks
