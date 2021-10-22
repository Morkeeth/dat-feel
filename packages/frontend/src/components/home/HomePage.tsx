import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import CreateTaskModal from './CreateTaskModal'
import TaskList from './TaskList'

type Props = {}

const HomePage: FC<Props> = () => {
  return (
    <div>
      <TaskList />
      <Spacer h={4} />
      <CreateTaskModal />
    </div>
  )
}

export default HomePage
