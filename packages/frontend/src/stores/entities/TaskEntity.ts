import { ethers, BigNumber } from 'ethers'
import { makeAutoObservable, observable, runInAction } from 'mobx'
import axios from 'axios'
import { TaskStatus } from '../../config/enums'
import { getAddressFromDeployment } from '../../utils/address'
import { web3Store } from '../web3Store'
import { StandardBounties__factory } from '../../generated/types/factories/StandardBounties__factory'

class TaskEntity {
  approvers: string[]
  id: string
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

  status: TaskStatus = TaskStatus.OPEN

  loading = true
  constructor(event: ethers.Event, contribEvent: ethers.Event) {
    makeAutoObservable(this, {
      loading: observable,
      data: observable,
    })

    const [bountyId, _sender, _issuers, _approvers, _data, _deadline, _token, _tokenVersion] =
      event.args || []

    this.id = bountyId
    this.creator = _sender
    this.issuers = _issuers
    this.approvers = _approvers
    this.deadline = _deadline
    this.token = _token
    this._tokenVersion = _token
    this.contributationId = contribEvent?.args[1]
    this.amount = contribEvent?.args[3]

    console.log(this.contributationId, this.amount)
    if (_data && _data.startsWith('https://')) {
      this.load(_data)
    }
  }

  load = async (data: string) => {
    const result = await axios.get(data)

    runInAction(() => {
      this.data = result.data as any
    })
  }

  apply = async () => {
    const address = getAddressFromDeployment('StandardBounties', web3Store.chainId)
    const contract = StandardBounties__factory.connect(address, web3Store.signer)
    await contract.addIssuers(
      web3Store.contractOwner,
      this.id,
      web3Store.account,
      [web3Store.account],
      {
        from: web3Store.account,
      }
    )
  }
}

export default TaskEntity
