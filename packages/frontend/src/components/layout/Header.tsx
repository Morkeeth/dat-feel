import React, { FC } from 'react'
import { Button, Grid, Link, Page, Spacer } from '@geist-ui/react'
import NextLink from 'next/link'
import useWeb3 from '../../web3/useWeb3'
import WalletConnectButton from '../WalletConnectButton'
import ThemeToggle from '../ThemeToggle'

const Header: FC = () => {
  const { account } = useWeb3()

  return (
    <Page.Header>
      <Grid.Container justify="space-between">
        <Grid>
          <Grid.Container gap={2}>
            <Grid>
              <NextLink href="/" passHref>
                <Link>Home</Link>
              </NextLink>
            </Grid>
            <Grid>
              <NextLink href={`/user/${account}`} passHref>
                <Link>Account</Link>
              </NextLink>
            </Grid>
          </Grid.Container>
        </Grid>
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
