import React, { FC } from 'react'
import { Button, Grid, Page, Spacer } from '@geist-ui/react'
import useWeb3 from '../../web3/useWeb3'
import WalletConnectButton from '../WalletConnectButton'
import ThemeToggle from '../ThemeToggle'

const Header: FC = () => {
  const { account } = useWeb3()

  return (
    <Page.Header>
      <Grid.Container justify="space-between">
        <Grid />
        <Grid>
          <Grid.Container gap={1} direction="column">
            <Grid>
              <WalletConnectButton>{account}</WalletConnectButton>
            </Grid>
            <Grid>
              <Grid.Container justify="flex-end">
                <ThemeToggle />
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
      <Grid h="5" />
    </Page.Header>
  )
}

export default Header
