import { Spacer, Collapse } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import TaskList from './TaskList'
import Board from './Board'
import useIsOrgOwner from '../../hooks/useIsOrgOwner'

type Props = {}

const HomePage: FC<Props> = () => {
  const isOwner = useIsOrgOwner()
  return (
    <div>
      {isOwner && (
        <>
          <Collapse
            shadow
            title="Governance proposals"
            subtitle="Create a task from one of your proposals"
          >
            <TaskList />
          </Collapse>
          <Spacer h={4} />
        </>
      )}

      <Board />
    </div>
  )
}

export default HomePage
