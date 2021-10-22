import * as React from 'react'
import { FC } from 'react'
import { useModal, Button, Modal } from '@geist-ui/react'

type Props = {}

const CreateTaskModal: FC<Props> = () => {
  const { setVisible, bindings } = useModal()

  return (
    <div>
      <Button auto onClick={() => setVisible(true)}>
        Create Task
      </Button>
      <Modal width="35rem" {...bindings}>
        <Modal.Title>My Favorites</Modal.Title>
        <Modal.Content>
          <p>This is the width I want.</p>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CreateTaskModal
