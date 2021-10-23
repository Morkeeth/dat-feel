import * as React from 'react'
import { FC } from 'react'
import { Text } from '@geist-ui/react'
import TaskHeader from './TaskHeader'
import TaskContact from './TaskContact'
import TaskDescription from './TaskDescription'
import { useTaskContext } from '../../contexts/TaskContext'

type Props = {
  closeModal: () => void
}

const TaskPage: FC<Props> = ({ closeModal }) => {
  const { task } = useTaskContext()

  return (
    <div>
      <TaskHeader closeModal={closeModal} />
      <TaskDescription bioContent={task.data?.body || ''} />
      <TaskContact validator={task.taskValidator} />
    </div>
  )
}

export default TaskPage
