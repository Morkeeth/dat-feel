import { Spinner } from '@geist-ui/react'
import { toJS } from 'mobx'
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
    return <Spinner />
  }

  console.log({ users: toJS(users) })
  return <div />
}

export default observer(Leaderboard)
