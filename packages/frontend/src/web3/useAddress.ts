import useWeb3 from './useWeb3'
import { ContractName, defaultNetwork } from './web3-config'
import { getAddressFromDeployment } from '../utils/address'

const useAddress = (contract: ContractName) => {
  const { chainId } = useWeb3()

  const address = getAddressFromDeployment(contract, chainId || defaultNetwork)

  return address
}

export default useAddress
