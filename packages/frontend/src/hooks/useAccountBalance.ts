import { useEtherBalance } from '@usedapp/core'
import useWeb3 from '../web3/useWeb3'

const useAccountBalance = () => {
  const { account } = useWeb3()

  return useEtherBalance(account)
}

export default useAccountBalance
