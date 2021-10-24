import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { makeAutoObservable } from 'mobx'
import { GovernanceProposalSource } from '../types'

type Store = {
  provider: Provider
  signer: Signer
  chainId: number
  contractOwner: string
  account: string
  blockNumber: 0
}

export const web3Store = makeAutoObservable<Store>({
  provider: undefined,
  signer: undefined,
  chainId: 5, //   process.env.NODE_ENV === 'development' ? 1337 : 4,
  contractOwner: undefined,
  account: undefined,
  blockNumber: 0,
} as any)
