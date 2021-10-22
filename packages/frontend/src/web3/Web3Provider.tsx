import { createContext, FC, useContext, useState } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Web3Provider } from '@ethersproject/providers'
import { useWallet, UseWalletProvider } from 'use-wallet'

import {
  injected,
  network,
  //   walletconnect,
  //   walletlink,
  ledger,
  trezor,
  lattice,
  frame,
  authereum,
  fortmatic,
  magic,
  portis,
  torus,
} from '../config/connectors'

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  }
  if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  }
  console.error(error)
  return 'An unknown error occurred. Check the console for more details.'
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

type Web3ProviderContextType = {
  activatingConnector: any
  setActivatingConnector: (connector: string) => void
}

const Web3ProviderContext = createContext<Web3ProviderContextType>({} as Web3ProviderContextType)

const Web3ProviderComp: FC = ({ children }) => {
  const [activatingConnector, setActivatingConnector] = useState<any>()
  const value = {
    activatingConnector,
    setActivatingConnector,
  }

  return <UseWalletProvider chainId={1}>{children}</UseWalletProvider>
  return (
    <Web3ProviderContext.Provider value={value}>
      <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    </Web3ProviderContext.Provider>
  )
}

export const useWeb3ProviderContext = (): Web3ProviderContextType => {
  const store = useContext(Web3ProviderContext)
  if (!store) {
    throw new Error('Missing Web3ProviderContext.Provider')
  }
  return store
}

export default Web3ProviderComp
