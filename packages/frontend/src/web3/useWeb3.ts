import { useEthers } from '@usedapp/core'
import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useWallet } from 'use-wallet'
import { useDappConfig } from './web3-config'
import { Chains } from './web3-enums'
import { useWeb3ProviderContext } from './Web3Provider'

type UseWeb3Value = {
  account?: string | null | undefined
  connect: () => void
  disconnect: () => void
  signer?: JsonRpcSigner
  isConnected: boolean
  chainId?: number
  isCorrectChain: boolean
}

const useWeb3 = (): UseWeb3Value => {
  const { account, chainId, isConnected, connect } = useWallet()
  const isCorrectChain = true // Boolean(chainId && useDappConfig.supportedChains?.includes(chainId))

  return {
    account,
    chainId,
    isConnected: isConnected(),
    connect: () => {
      connect('injected')
    },
    disconnect: () => {
      deactivate()
    },
    isCorrectChain,
  }
}

export default useWeb3
