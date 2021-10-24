import { Spacer, Spinner, Table, Text } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import useTasks from '../hooks/useTasks'

type Props = {
  owner?: string
}

const Leaderboard: FC<Props> = ({ owner }) => {
  const { users, loading } = useTasks(owner)

  if (loading) {
    return (
      <>
        <Spacer h={2} />
        <Spinner />
      </>
    )
  }

  if (users.length === 0) {
    return null
  }

  return (
    <>
      <Text h2>Leaderboard</Text>
      <Table data={users}>
        <Table.Column prop="userAddress" label="User Address" />
        <Table.Column prop="xp" label="Experience Points" />
      </Table>
      <Spacer h={4} />
    </>
  )
}

export default observer(Leaderboard)
