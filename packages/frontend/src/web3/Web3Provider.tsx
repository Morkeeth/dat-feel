import { FC } from 'react'
import { DAppProvider } from '@usedapp/core'
import { useDappConfig } from './web3-config'

const Web3Provider: FC = ({ children }) => (
  <DAppProvider config={useDappConfig}>{children}</DAppProvider>
)

export default Web3Provider
