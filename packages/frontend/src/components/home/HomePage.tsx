import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import TaskList from './TaskList'

type Props = {}

const HomePage: FC<Props> = () => {
  return (
    <div>
      <TaskList />
      <Spacer h={4} />
    </div>
  )
}

export default HomePage
