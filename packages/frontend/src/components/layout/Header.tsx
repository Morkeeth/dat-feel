import React, { FC } from 'react'
import { Button, Grid, Page, Spacer } from '@geist-ui/react'
import useWeb3 from '../../web3/useWeb3'
import WalletConnectButton from '../WalletConnectButton'

const Header: FC = () => {
  const { account } = useWeb3()

  return (
    <Page.Header>
      <Grid.Container justify="space-between">
        <Grid>Logo</Grid>
        <Grid>
          <WalletConnectButton>{account}</WalletConnectButton>
        </Grid>
      </Grid.Container>
      <Grid h="5" />
    </Page.Header>
  )
}

export default Header
