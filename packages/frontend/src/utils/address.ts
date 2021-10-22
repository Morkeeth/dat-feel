// import hardhatContracts from '../generated/contracts/hardhat_contracts.json'
import { ContractName } from '../web3/web3-config'
import { Chains } from '../web3/web3-enums'

const deployments = {
  [Chains.LOCALHOST]: 'localhost',
  [Chains.BSC_TESNET]: 'smartchaintest',
}

export const getAddressFromDeployment = (
  contractName: ContractName,
  chainId: keyof typeof deployments
): string => {
  const deploymentName = deployments[chainId]

  // return hardhatContracts[chainId][deploymentName].contracts[contractName].address
}
