import * as React from 'react'
import { FC } from 'react'
import { Text } from '@geist-ui/react'
import TaskHeader from './TaskHeader'
import TaskContact from './TaskContact'
import TaskDescription from './TaskDescription'
import { useTaskContext } from '../../contexts/TaskContext'

const TaskPage: FC = () => {
  const { task } = useTaskContext()

  return (
    <div>
      <TaskHeader task={task} />
      <TaskDescription bioContent={task.description} />
      <TaskContact validator={task.taskValidator} />
    </div>
  )
}

export default TaskPage
