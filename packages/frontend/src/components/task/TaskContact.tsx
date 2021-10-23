import * as React from 'react'
import { FC } from 'react'
import { Spacer, Text } from '@geist-ui/react'
import UserLink from '../UserLink'
import { useTaskContext } from '../../contexts/TaskContext'

type Props = {
  validator: string
}

const TaskContact: FC<Props> = () => {
  const { task } = useTaskContext()

  return (
    <div>
      <Text h3>Contact</Text>
      <UserLink address={task.approvers[0]} />

      <Spacer h={2} />
    </div>
  )
}

export default TaskContact
