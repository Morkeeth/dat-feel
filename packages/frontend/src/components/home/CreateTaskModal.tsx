import * as React from 'react'
import { FC } from 'react'
import { useModal, Button, Modal, Input, Grid, Textarea } from '@geist-ui/react'

type Props = {}

const CreateTaskModal: FC<Props> = () => {
  const { setVisible, bindings } = useModal()
  const submit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div>
      <Button auto onClick={() => setVisible(true)}>
        Create Task
      </Button>
      <Modal width="35rem" {...bindings}>
        <Modal.Title>Create task</Modal.Title>
        <Modal.Content>
          <form onSubmit={submit}>
            <Grid.Container gap={2}>
              <Grid xs={24}>
                <Input width="100%" placeholder="Title" />
              </Grid>
              <Grid xs={24}>
                <Textarea width="100%" placeholder="Description" />
              </Grid>

              <Grid>
                <Button htmlType="submit">submit</Button>
              </Grid>
            </Grid.Container>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CreateTaskModal
