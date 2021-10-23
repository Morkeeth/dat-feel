import { createContext, FC, useContext, useState } from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

const Web3ProviderComp: FC = ({ children }) => {
  return <UseWalletProvider chainId={1337}>{children}</UseWalletProvider>
}

export default Web3ProviderComp
