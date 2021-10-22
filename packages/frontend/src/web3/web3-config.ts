import { ChainId, Config, MULTICALL_ADDRESSES, LOCAL_CHAINS } from '@usedapp/core'
import { getAddressFromDeployment } from '../utils/address'
import { Chains } from './web3-enums'

export const defaultNetwork = 1337

export type ContractName = 'Multicall' | 'Token' | 'Counter' | 'NFT' | 'NFTMarket'

export const contracts: Record<string, ContractName> = {
  COUNTER: 'Counter',
  TOKEN: 'Token',
  MULTICALL: 'Multicall',
  NFT: 'NFT',
  NFT_MARKET: 'NFTMarket',
}

const MULTICALL = {
  [Chains.BSC_TESNET]: '0xc954259014d3AA11DeA6F0a954873d99Bfb2f87F',
}

export const useDappConfig: Config = {
  readOnlyUrls: {
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
  },
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    ...MULTICALL,
    [ChainId.Hardhat]: getAddressFromDeployment('Multicall', ChainId.Localhost),
    [ChainId.Localhost]: getAddressFromDeployment('Multicall', ChainId.Localhost),
  },
  supportedChains: [
    // ChainId.Mainnet,
    // ChainId.Goerli,
    // ChainId.Kovan,
    // ChainId.Rinkeby,
    // ChainId.Ropsten,
    // ChainId.xDai,
    // ChainId.Localhost,
    // ChainId.Hardhat,
    // ChainId.BSC,
    Chains.BSC_TESNET,
    ...LOCAL_CHAINS,
  ],
}
