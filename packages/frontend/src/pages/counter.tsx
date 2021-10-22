import type { NextPage } from 'next'
import SEO from '../components/SEO'
import WalletConnectButton from '../components/WalletConnectButton'
import UserBalance from '../components/UserBalance'
import useCounterCount from '../hooks/useCounterCount'
import { formatBigNumber } from '../utils/formatters'
import useIncreaseCounter from '../hooks/useIncreaseCounter'
import Button from '../components/Button'
import { Grid } from '@geist-ui/react'

const Counter = () => {
  const count = useCounterCount()
  const { send: increase, state } = useIncreaseCounter()

  return (
    <Grid.Container gap={4}>
      <Grid>
        <UserBalance />
      </Grid>
      <Grid> Count: {count.data && formatBigNumber(count.data)}</Grid>
      <Grid>
        {' '}
        <Button loading={state.status === 'Mining'} onClick={() => increase()}>
          Increase count
        </Button>
      </Grid>{' '}
    </Grid.Container>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Home" />
      <div>
        <WalletConnectButton>
          <Counter />
        </WalletConnectButton>
      </div>
    </>
  )
}

export default Home
