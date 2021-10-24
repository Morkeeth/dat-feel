import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import Board from './Board'
import Leaderboard from '../Leaderboard'
import Organizations from '../Organizations'

const HomePage: FC = () => {
  return (
    <div>
      <Spacer h={5} />
      <Organizations />
      <Board />
      <Leaderboard />
    </div>
  )
}

export default HomePage
