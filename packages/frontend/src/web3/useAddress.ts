import { getAddressFromDeployment } from '../utils/address'
import useWeb3 from './useWeb3'
import { ContractName, defaultNetwork } from './web3-config'

const useAddress = (contract: ContractName) => {
  const { chainId } = useWeb3()

  const address = getAddressFromDeployment(contract, chainId || defaultNetwork)

  return address
}

export default useAddress
