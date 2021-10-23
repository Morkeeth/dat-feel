import { ethers, BigNumber } from 'ethers'
import { makeAutoObservable, observable, runInAction } from 'mobx'
import axios from 'axios'

class TaskEntity {
  approvers: string[]
  id: string
  creator: string
  deadline: BigNumber
  issuers: string[]
  token: string
  _tokenVersion: BigNumber
  data?: {
    title: string
    body: string
    proposalUrl: string
  }

  loading = true
  constructor(event: ethers.Event) {
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

    if (_data && _data.startsWith('https://')) {
      this.load(_data)
    }
  }

  load = async (data: string) => {
    console.log('HEJ!')
    const result = await axios.get(data)
    console.log(result)

    runInAction(() => {
      this.data = result.data
    })
  }
}

export default TaskEntity
