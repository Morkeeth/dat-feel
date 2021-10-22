import { Dot } from '@geist-ui/react'
import React, { FC } from 'react'
import Button from './Button'
import ConnectWalletModal from './ConnectWalletModal'
import useWeb3 from '../web3/useWeb3'

type Props = {}

const WalletConnectButton: FC<Props> = ({ children }) => {
  const { connect, isConnected, isCorrectChain } = useWeb3()

  if (isConnected) {
    return <>{children}</>
  }

  if (isConnected && !isCorrectChain) {
    return <Dot type="error">Unsupported network</Dot>
  }

  // return <ConnectWalletModal />

  return (
    <Button onClick={() => connect()} shadow type="secondary">
      Connect wallet
    </Button>
  )
}

export default WalletConnectButton
