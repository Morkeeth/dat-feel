import * as React from 'react'
import { FC } from 'react'
import Button from './Button'
import useWeb3 from '../web3/useWeb3'

type Props = {}

const LogoutButton: FC<Props> = () => {
  const { connected, disconnect } = useWeb3()

  if (!connected) {
    return null
  }

  return (
    <Button onClick={() => disconnect()} shadow type="secondary">
      Logout
    </Button>
  )
}

export default LogoutButton
