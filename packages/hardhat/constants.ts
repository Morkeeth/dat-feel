export type SupportedNetworks =
  | 'localhost'
  | 'mainnet'
  | 'kovan'
  | 'rinkeby'
  | 'ropsten'
  | 'goerli'
  | 'xdai'
  | 'matic'
  | 'mumbai'
  | 'smartchain'
  | 'smartchaintest'

export type Network = {
  name: string
  color: string
  chainId: number
  blockExplorer: string
  rpcUrl: string
  faucet?: string
  price?: number
  gasPrice?: number
}

export type Networks = {
  [key in SupportedNetworks]: Network
}
