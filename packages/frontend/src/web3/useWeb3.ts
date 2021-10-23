import { JsonRpcSigner, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { useWallet, getProviderFromUseWalletId } from 'use-wallet'
import { useMemo } from 'react'
import { defaultNetwork } from './web3-config'

type UseWeb3Value = {
  account?: string | null | undefined
  connect: () => void
  disconnect: () => void
  signer?: JsonRpcSigner
  provider: JsonRpcProvider
  isConnected: boolean
  chainId?: number
  isCorrectChain: boolean
}

const useWeb3 = (): UseWeb3Value => {
  const { account, chainId, isConnected, connect, _web3ReactContext } = useWallet()
  const _chainId = isConnected() ? chainId : defaultNetwork
  const isCorrectChain = true // Boolean(chainId && useDappConfig.supportedChains?.includes(chainId))
  const provider = useMemo(() => new JsonRpcProvider('http://localhost:8545'), [chainId])
  const signer = useMemo(
    () => _web3ReactContext?.library && new Web3Provider(_web3ReactContext?.library).getSigner(),
    [_web3ReactContext?.library]
  )

  return {
    account,
    chainId: _chainId,
    isConnected: isConnected(),
    connect: () => {
      connect('injected')
    },
    disconnect: () => {
      deactivate()
    },
    isCorrectChain,
    library: _web3ReactContext?.library,
    signer,
    provider,
  }
}

export default useWeb3
