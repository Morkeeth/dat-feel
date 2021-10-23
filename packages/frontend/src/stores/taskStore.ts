import { makeAutoObservable, runInAction } from 'mobx'
import { ethers } from 'ethers'
import TaskEntity from './entities/TaskEntity'
import { web3Store } from './web3Store'
import { StandardBounties__factory } from '../generated/types'
import { getAddressFromDeployment } from '../utils/address'
import { ipfsClient } from '../utils/ipfs'
import { TaskCreationDataArgs } from '../types'
import { TaskStatus } from '../config/enums'

type Store = {
  tasks: TaskEntity[]
  setTasks: (tasks: TaskEntity[]) => void
  fetchTasks: () => void
  isFetching: boolean
  isCreating: boolean
  createTask: (args: TaskCreationDataArgs) => Promise<any>
}

export const taskStore = makeAutoObservable<Store>({
  tasks: [],
  isFetching: false,
  isCreating: false,
  setTasks: (tasks: TaskEntity[]) => {
    taskStore.tasks = tasks
  },
  createTask: async (args: TaskCreationDataArgs): Promise<any> => {
    runInAction(() => {
      taskStore.isCreating = true
    })
    try {
      const { title, body, proposalUrl, compansation } = args
      const data = JSON.stringify({
        title,
        body,
        proposalUrl,
      })
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      const contract = StandardBounties__factory.connect(
        getAddressFromDeployment('StandardBounties', web3Store.chainId),
        web3Store.signer
      )
      const account = web3Store.account

      await contract.issueAndContribute(
        account as string,
        [],
        [account],
        url,
        Date.now() + 100000,
        '0x0000000000000000000000000000000000000000',
        0,
        ethers.utils.parseEther(compansation),
        { value: ethers.utils.parseEther(compansation) }
      )
      taskStore.fetchTasks()
    } catch (error) {
      return {
        error,
      }
    } finally {
      runInAction(() => {
        taskStore.isCreating = true
      })
    }
    return {}
  },

  fetchTasks: async () => {
    const contract = StandardBounties__factory.connect(
      getAddressFromDeployment('StandardBounties', web3Store.chainId),
      web3Store.provider
    )
    const bounties = await contract.queryFilter('BountyIssued', 0, 'latest')
    const contri = await contract.queryFilter('ContributionAdded', 0, 'latest')
    const fullfilled = await contract.queryFilter('BountyFulfilled', 0, 'latest')

    const matchEvent = (id: any) => (event: any) => {
      return event.args._bountyId.toString() === id
    }

    // event ContributionAdded(
    //   uint256 _bountyId,
    //   uint256 _contributionId,
    //   address payable _contributor,
    //   uint256 _amount
    // );

    // emit BountyFulfilled(
    //   _bountyId,
    //   (bounties[_bountyId].fulfillments.length - 1),
    //   _fulfillers,
    //   _data, // The _data string is emitted in an event for easy off-chain consumption
    //   _sender
    // );
    const _tasks = bounties.map((bountyEvent, i) => {
      const data = {
        status: TaskStatus.OPEN,
        contributationId: undefined,
        amount: undefined,
        fullfiller: undefined,
      }

      const fullfilledMatch = fullfilled.find(matchEvent(bountyEvent.args._bountyId.toString()))

      if (fullfilledMatch) {
        data.status = TaskStatus.REVIEW
        data.fullfiller = fullfilledMatch.args[2][0]
      }

      const contriMatch = contri.find(matchEvent(bountyEvent.args._bountyId.toString()))

      if (contriMatch) {
        data.contributationId = contriMatch?.args[1]
        data.amount = contriMatch?.args[3]
      }

      return new TaskEntity(bountyEvent, data as any)
    })

    runInAction(() => {
      taskStore.tasks = _tasks
    })
  },
})