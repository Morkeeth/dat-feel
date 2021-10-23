import hardhatContracts from '../generated/contracts/hardhat_contracts.json'
import { ContractName } from '../web3/web3-config'
import { Chains } from '../web3/web3-enums'

const deployments = {
  [Chains.LOCALHOST]: 'localhost',
}

export const getAddressFromDeployment = (
  contractName: ContractName,
  chainId: keyof typeof deployments
): string => {
  return hardhatContracts[1337].localhost.contracts.StandardBounties.address
  // const deploymentName = deployments[chainId]

  return (hardhatContracts as any)[chainId][deploymentName].contracts[contractName].address
}
