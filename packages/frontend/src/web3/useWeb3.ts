import { JsonRpcSigner, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { useWallet, getProviderFromUseWalletId } from 'use-wallet'
import { useEffect, useMemo } from 'react'
import { defaultNetwork } from './web3-config'
import { web3Store } from '../stores/web3Store'

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

  useEffect(() => {
    web3Store.provider = provider
    web3Store.signer = signer
    web3Store.chainId = chainId as number
    web3Store.contractOwner = account as string
    web3Store.account = account as string
  }, [signer, provider, chainId, account])

  return {
    account,
    chainId: _chainId,
    isConnected: isConnected(),
    connect: () => {
      connect('injected')
    },
    disconnect: () => {
      // deactivate()
    },
    isCorrectChain,
    library: _web3ReactContext?.library,
    signer,
    provider,
  }
}

export default useWeb3
