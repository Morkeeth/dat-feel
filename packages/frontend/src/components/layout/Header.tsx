import React, { FC } from 'react'
import useWeb3 from '../../web3/useWeb3'
import LogoutButton from '../LogoutButton'
import { Grid, Page, Spacer } from '@geist-ui/react'
import Description from '../Description'
import useTokenAmount from '../../hooks/useTokenAmount'
import { formatBigNumber } from '../../utils/formatters'

type Props = {}

const Header: FC<Props> = () => {
  const { account, chainId, connected } = useWeb3()
  const tokenAmount = useTokenAmount()

  if (!connected) {
    return null
  }
  return (
    <Page.Header>
      <Grid.Container gap={4}>
        <Grid>
          <Description title="Account" content={account} />
        </Grid>
        <Grid>
          <Description title="Chain" content={chainId} />
        </Grid>
        {tokenAmount && (
          <Grid>
            <Description title="JTK" content={formatBigNumber(tokenAmount)} />
          </Grid>
        )}
      </Grid.Container>
      <Spacer w={5} />
      <LogoutButton />
      <Spacer w={5} />
    </Page.Header>
  )
}

export default Header
