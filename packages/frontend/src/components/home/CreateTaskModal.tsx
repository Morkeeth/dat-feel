import * as React from 'react'
import { FC } from 'react'
import { useModal, Button, Modal, Input, Grid, Textarea, useInput, Select } from '@geist-ui/react'
import { GovernanceProposal } from '../../types'
import { useTasksContext } from '../../contexts/TasksContext'

type Props = { proposal: GovernanceProposal }

const CreateTaskModal: FC<Props> = ({ proposal }) => {
  const { setVisible, bindings } = useModal()
  const { createTask, isCreating } = useTasksContext()
  const { state: body, bindings: descriptionBindings } = useInput('')
  const { state: compansation, bindings: compansationBindings } = useInput('')

  const [level, setLevel] = React.useState('')

  const reset = () => {}

  const submit = (e: any) => {
    if (isCreating) {
      return
    }

    const data = {
      title: proposal.title,
      body,
      level,
    }
    createTask(data)

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
                <Input width="100%" placeholder="Title" value={proposal.title} />
              </Grid>
              <Grid xs={24}>
                <Textarea width="100%" placeholder="Description" {...descriptionBindings} />
              </Grid>
              <Grid xs={24}>
                <Input width="100%" icon="$" placeholder="Compansation" {...compansationBindings} />
              </Grid>
              <Grid xs={24}>
                <Select
                  width="100%"
                  placeholder="Level"
                  clearable
                  onChange={(value) => setLevel(value as string)}
                >
                  {Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <Select.Option key={index} value={(index + 1).toString()}>
                        Level {index + 1}
                      </Select.Option>
                    ))}
                </Select>
              </Grid>
              <Grid xs={24}>
                <Input
                  width="100%"
                  placeholder="Proposer"
                  disabled
                  value={proposal.proposer.address}
                />
              </Grid>

              <Grid>
                <Button loading={isCreating} htmlType="submit">
                  submit
                </Button>
              </Grid>
            </Grid.Container>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CreateTaskModal
