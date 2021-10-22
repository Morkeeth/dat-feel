import React, { FC } from 'react'
import { Grid, Page, Spacer } from '@geist-ui/react'
import useWeb3 from '../../web3/useWeb3'

type Props = {}

const Header: FC<Props> = () => {
  const { account, chainId, connected } = useWeb3()

  if (!connected) {
    return null
  }
  return <Page.Header />
}

export default Header
