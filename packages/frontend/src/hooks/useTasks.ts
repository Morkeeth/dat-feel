import { useEffect, useState } from 'react'
import { StandardBounties__factory } from '../generated/types'
import TaskEntity from '../stores/entities/TaskEntity'
import useAddress from '../web3/useAddress'
import useWeb3 from '../web3/useWeb3'

const useTasks = (owner?: string) => {
  const [isFetching, setIsFetching] = useState(true)
  const [tasks, setTasks] = useState<TaskEntity[]>([])
  const address = useAddress('StandardBounties')
  const { provider, account, signer } = useWeb3()

  const fetchTasks = async () => {
    const contract = StandardBounties__factory.connect(address, provider)
    const bounties = await contract.queryFilter('BountyIssued', 0, 'latest')
    const contri = await contract.queryFilter('ContributionAdded', 0, 'latest')

    let _tasks = bounties.map((bountyEvent, i) => new TaskEntity(bountyEvent, contri[i]))

    console.log({ owner })
    if (owner) {
      _tasks = _tasks.filter((task) => task.creator === owner)
    }

    setTasks(_tasks)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchTasks()

    return () => {
      setTasks([])
    }
  }, [owner])

  return {
    tasks,
    loading: isFetching,
  }
}

export default useTasks
