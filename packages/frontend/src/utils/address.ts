import { ContractName } from '../web3/web3-config'
import { Chains } from '../web3/web3-enums'

const deployments = {
  [Chains.LOCALHOST]: 'localhost',
}

export const STANDARD_BOUNTIES_ADDRESS = {
  1: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Localhost- Change this to yours
  1337: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Localhost- Change this to yours
  4: '0x005BAD45C0886643b3D5A6684D8caD3d66F60761', // Rinkeby
  5: '0x43A4860EF71E0BB19982240187ce981423B42AcA', // Goerli
}

export const getAddressFromDeployment = (
  contractName: ContractName,
  chainId: keyof typeof deployments
): string => {
  const contracts = {
    StandardBounties: STANDARD_BOUNTIES_ADDRESS,
  }

  console.log(contracts[contractName][chainId], contractName, chainId)
  return contracts[contractName][chainId]
}
