import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import TaskList from './TaskList'
import useIsOrgOwner from '../../hooks/useIsOrgOwner'

type Props = {}

const HomePage: FC<Props> = () => {
  const isOwner = useIsOrgOwner()
  return (
    <div>
      {isOwner && (
        <>
          <TaskList />
          <Spacer h={4} />
        </>
      )}
    </div>
  )
}

export default HomePage
