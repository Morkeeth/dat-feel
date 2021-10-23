/* This context can be removed once all subpages are using the store directly instead of props */

import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { useToasts } from '@geist-ui/react'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { TaskCreationDataArgs } from '../types'
import { ipfsClient } from '../utils/ipfs'
import { StandardBounties__factory } from '../generated/types'
import useAddress from '../web3/useAddress'
import useWeb3 from '../web3/useWeb3'
import TaskEntity from '../stores/entities/TaskEntity'
import { TaskStatus } from '../config/enums'

type TasksContextType = {
  isCreating: boolean
  createTask: (args: TaskCreationDataArgs) => Promise<void>
  tasks: TaskEntity[]
  isFetching: boolean
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType)

export const TasksContextProvider: FC = ({ children }) => {
  const [, setToast] = useToasts()
  const [isCreating, setIsCreating] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [tasks, setTasks] = useState<TaskEntity[]>([])
  const address = useAddress('StandardBounties')
  const { provider, account, signer } = useWeb3()

  const loadTasks = async () => {
    setIsFetching(true)
    const contract = StandardBounties__factory.connect(address, provider)
    const bounties = await contract.queryFilter('BountyIssued', 0, 'latest')
    const contri = await contract.queryFilter('ContributionAdded', 0, 'latest')

    console.log(contri)
    const _tasks = bounties.map((bountyEvent, i) => new TaskEntity(bountyEvent, contri[i]))
    setTasks(_tasks)
    setIsFetching(false)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const createTask = async (args: TaskCreationDataArgs) => {
    setIsCreating(true)
    const { title, body, proposalUrl, compansation } = args

    const contract = StandardBounties__factory.connect(address, signer)

    try {
      const data = JSON.stringify({
        title,
        body,
        proposalUrl,
      })
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      await contract.issueAndContribute(
        account as string,
        [],
        [account],
        url,
        BigNumber.from('0'),
        '0xBA78CD28F7132958235D278fF3C5DC5E6d34cc15',
        BigNumber.from('0'),
        ethers.utils.parseEther(compansation),
        { value: ethers.utils.parseEther(compansation) }
      )
    } catch (e: any) {
      console.error(e)
      setToast({
        type: 'error',
        text: e.message,
      })
    } finally {
      setIsCreating(false)
    }
    loadTasks()
  }

  const value = { createTask, isCreating, isFetching, tasks }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const TasksContextConsumer = TasksContext.Consumer

export const useTasksContext = (): TasksContextType => {
  const store = useContext(TasksContext)
  if (!store) {
    throw new Error('Missing TasksContext.Provider')
  }
  return store
}
