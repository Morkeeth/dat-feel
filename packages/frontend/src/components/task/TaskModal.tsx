import { Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import TaskPage from './TaskPage'
import TaskEntity from '../../stores/entities/TaskEntity'
import { TaskContextProvider } from '../../contexts/TaskContext'

type Props = {
  task: TaskEntity
  bindings: any
  closeModal: () => void
}

const TaskModal: FC<Props> = ({ task, bindings, closeModal }) => {
  return (
    <Modal width="35rem" {...bindings}>
      <TaskContextProvider task={task}>
        <Modal.Title>{task.data?.title}</Modal.Title>
        <TaskPage closeModal={closeModal} />
      </TaskContextProvider>
    </Modal>
  )
}

export default TaskModal
