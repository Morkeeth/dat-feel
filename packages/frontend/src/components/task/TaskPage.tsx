import * as React from 'react'
import { FC } from 'react'
import { Text } from '@geist-ui/react'
import { useTaskContext } from '../../contexts/TaskContext'

const TaskPage: FC = () => {
  const { task } = useTaskContext()

  return (
    <div>
      <Text h1>{task.title}</Text>
    </div>
  )
}

export default TaskPage
