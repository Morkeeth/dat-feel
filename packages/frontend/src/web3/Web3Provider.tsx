import { useWallet, UseWalletProvider } from 'use-wallet'
import { defaultNetwork } from './web3-config'

const Web3ProviderComp: FC = ({ children }) => {
  return <UseWalletProvider chainId={defaultNetwork}>{children}</UseWalletProvider>
}

export default Web3ProviderComp
