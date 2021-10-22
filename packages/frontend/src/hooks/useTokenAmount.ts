import { useTokenBalance } from '@usedapp/core'
import { BigNumber } from 'ethers'
import useAddress from '../web3/useAddress'
import useWeb3 from '../web3/useWeb3'

const useTokenAmount = (): BigNumber | undefined => {
  const { account } = useWeb3()
  const address = useAddress('Token')

  return useTokenBalance(address, account)
}

export default useTokenAmount
