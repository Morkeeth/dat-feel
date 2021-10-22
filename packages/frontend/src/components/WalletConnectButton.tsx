import { Dot } from '@geist-ui/react'
import React, { FC } from 'react'
import useWeb3 from '../web3/useWeb3'
import Button from './Button'

type Props = {}

const WalletConnectButton: FC<Props> = ({ children }) => {
  const { connect, connected, isCorrectChain } = useWeb3()

  if (connected) {
    return <>{children}</>
  }

  if (connected && !isCorrectChain) {
    return <Dot type="error">Unsupported network</Dot>
  }

  return (
    <Button onClick={() => connect()} shadow type="secondary">
      Connect wallet
    </Button>
  )
}

export default WalletConnectButton
