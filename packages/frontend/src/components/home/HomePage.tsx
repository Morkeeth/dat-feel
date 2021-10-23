import { Spacer, Collapse } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import ProposalList from './ProposalList'
import Board from './Board'
import useIsOrgOwner from '../../hooks/useIsOrgOwner'
import Leaderboard from '../Leaderboard'
import Organizations from '../Organizations'

const HomePage: FC = () => {
  return (
    <div>
      <Spacer h={5} />
      <Organizations />
      <Leaderboard />
      <Board />
    </div>
  )
}

export default HomePage
