import { FC, useEffect, useMemo } from 'react'
import { ERC20, ERC20__factory } from '../generated/types'
import { GetContractTypeFromFactory } from '../generated/types/commons'
import { Counter__factory } from '../generated/types/factories/Counter__factory'
import { getAddressFromDeployment } from '../utils/address'
import { TransactionStatus, useContractFunction, useSendTransaction } from '@usedapp/core'
import useWeb3 from '../web3/useWeb3'
import { Contract } from '@ethersproject/contracts'
import useAddress from '../web3/useAddress'
import { LogDescription } from '@ethersproject/abi'

type UseIncreaseCounterReturn = {
  send: () => void
  state: TransactionStatus
  events: LogDescription[] | undefined
}

const useIncreaseCounter = (): UseIncreaseCounterReturn => {
  const { library } = useWeb3()
  const address = useAddress('Counter')
  const contract = Counter__factory.connect(address, library)

  return useContractFunction(contract, 'increase', { transactionName: 'Increase' })
}

export default useIncreaseCounter
