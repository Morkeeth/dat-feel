import { Modal, Text } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import TaskPage from './TaskPage'
import TaskEntity from '../../stores/entities/TaskEntity'
import { TaskContextProvider } from '../../contexts/TaskContext'
import styled from 'styled-components'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: flex-start;
`

type Props = {
  task: TaskEntity
  bindings: any
  closeModal: () => void
}

const TaskModal: FC<Props> = ({ task, bindings, closeModal }) => {
  return (
    <Modal width="35rem" {...bindings}>
      <TaskContextProvider task={task}>
        <ModalContainer>
          <TaskPage closeModal={closeModal} />
        </ModalContainer>
      </TaskContextProvider>
    </Modal>
  )
}

export default TaskModal
