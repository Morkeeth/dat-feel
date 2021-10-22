import { useEthers } from '@usedapp/core'
import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers'
import { useDappConfig } from './web3-config'
import { Chains } from './web3-enums'

type UseWeb3Value = {
  account?: string | null | undefined
  connect: () => void
  disconnect: () => void
  signer?: JsonRpcSigner
  connected: boolean
  chainId?: number
  library?: JsonRpcProvider
  isCorrectChain: boolean
  etherSymbol: string
}

const useWeb3 = (): UseWeb3Value => {
  const { activateBrowserWallet, account, deactivate, library, chainId, ...rest } = useEthers()
  const isCorrectChain = Boolean(chainId && useDappConfig.supportedChains?.includes(chainId))

  return {
    account,
    chainId,
    connected: Boolean(account),
    connect: () => {
      activateBrowserWallet()
    },
    disconnect: () => {
      deactivate()
    },
    library,
    signer: library?.getSigner(),
    isCorrectChain,
    etherSymbol: Chains.BSC == chainId || Chains.BSC_TESNET == chainId ? 'BNB' : 'ETH',
  }
}

export default useWeb3
