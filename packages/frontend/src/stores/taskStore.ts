import { makeAutoObservable, runInAction } from 'mobx'
import { ethers } from 'ethers'
import TaskEntity from './entities/TaskEntity'
import { web3Store } from './web3Store'
import { StandardBounties, StandardBounties__factory } from '../generated/types'
import { getAddressFromDeployment } from '../utils/address'
import { ipfsClient } from '../utils/ipfs'
import { TaskCreationDataArgs } from '../types'
import { TaskStatus } from '../config/enums'
import { formatBigNumber } from '../utils/formatters'

type Store = {
  tasks: TaskEntity[]
  users: any
  setTasks: (tasks: TaskEntity[]) => void
  fetchTasks: () => void
  isFetching: boolean
  isCreating: boolean
  createTask: (args: TaskCreationDataArgs) => Promise<any>
  fetchUsers: () => void
}

export const taskStore = makeAutoObservable<Store>({
  tasks: [],
  users: [],
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

      console.log(url)
      return
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
        taskStore.isCreating = false
      })
    }
    return {}
  },

  fetchUsers: async () => {
    const contract = StandardBounties__factory.connect(
      getAddressFromDeployment('StandardBounties', web3Store.chainId),
      web3Store.provider
    )

    const users = await contract.queryFilter('UserAdded', 0, 'latest')

    const normalizedUsers = users
      .map(({ args }) => {
        const [userAddress, xp] = args
        return {
          userAddress,
          xp: `${Math.floor(parseFloat(formatBigNumber(xp)))}`,
        }
      })
      .sort((userA, userB) => (userB.xp > userA.xp ? 1 : -1))

    runInAction(() => {
      taskStore.users = normalizedUsers
    })
  },

  fetchTasks: async () => {
    const contract = StandardBounties__factory.connect(
      getAddressFromDeployment('StandardBounties', web3Store.chainId),
      web3Store.provider
    )
    const bounties = await contract.queryFilter('BountyIssued', 0, 'latest')
    const contri = await contract.queryFilter('ContributionAdded', 0, 'latest')
    const fullfilled = await contract.queryFilter('BountyFulfilled', 0, 'latest')
    const accepted = await contract.queryFilter('FulfillmentAccepted', 0, 'latest')

    // emit FulfillmentAccepted(_bountyId, _fulfillmentId, _sender, _tokenAmounts);

    // emit BountyFulfilled(
    //   _bountyId,
    //   (bounties[_bountyId].fulfillments.length - 1),
    //   _fulfillers,
    //   _data, // The _data string is emitted in an event for easy off-chain consumption
    //   _sender
    // );
    const matchEvent = (id: any) => (event: any) => {
      return event.args._bountyId.toString() === id
    }

    // FulfillmentAccepted(_bountyId, _fulfillmentId, _sender, _tokenAmounts);
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
        fullFillId: undefined,
      }

      const fullfilledMatch = fullfilled.find(matchEvent(bountyEvent.args._bountyId.toString()))

      if (fullfilledMatch) {
        data.status = TaskStatus.REVIEW
        data.fullFillId = fullfilledMatch.args[1]
        data.fullfiller = fullfilledMatch.args[2][0]
      }

      const contriMatch = contri.find(matchEvent(bountyEvent.args._bountyId.toString()))

      if (contriMatch) {
        data.contributationId = contriMatch?.args[1]
        data.amount = contriMatch?.args[3]
      }

      const acceptedMatch = accepted.find(matchEvent(bountyEvent.args._bountyId.toString()))

      if (acceptedMatch) {
        data.status = TaskStatus.COMPLETE
      }

      return new TaskEntity(bountyEvent, data as any)
    })

    runInAction(() => {
      taskStore.tasks = _tasks
    })
  },
})
