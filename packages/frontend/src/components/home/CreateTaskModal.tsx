import * as React from 'react'
import { FC } from 'react'
import { useModal, Button, Modal, Input, Grid, Textarea, useInput, Select } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { GovernanceProposal } from '../../types'
import { useTasksContext } from '../../contexts/TasksContext'
import useCreateTask from '../../hooks/useCreateTask'

type Props = { proposal: GovernanceProposal; close: () => void }

const CreateTaskModal: FC<Props> = ({ proposal, close }) => {
  const { setVisible, bindings } = useModal()
  const { isCreating, create } = useCreateTask()
  const { state: body, bindings: descriptionBindings } = useInput('')
  const { state: compansation, bindings: compansationBindings } = useInput('')
  const [level, setLevel] = React.useState('')

  const submit = (e: any) => {
    if (isCreating) {
      return
    }

    const data = {
      title: proposal.title,
      body,
      level,
      proposalUrl: 'http://link.com',
      compansation,
    }
    create(data)
    setVisible(false)
    close()
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
                <Input
                  width="100%"
                  icon="ETH"
                  placeholder="Compansation"
                  required
                  {...compansationBindings}
                />
              </Grid>
              <Grid xs={24}>
                <Select
                  width="100%"
                  placeholder="Minimum level"
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

export default observer(CreateTaskModal)
