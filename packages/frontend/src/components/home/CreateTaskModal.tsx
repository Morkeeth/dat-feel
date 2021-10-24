import * as React from 'react'
import { FC } from 'react'
import {
  useModal,
  Button,
  Modal,
  Input,
  Grid,
  Textarea,
  useInput,
  Select,
  Spacer,
} from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { GovernanceProposal } from '../../types'
import useCreateTask from '../../hooks/useCreateTask'

type Props = { proposal: GovernanceProposal; close: () => void }

const CreateTaskModal: FC<Props> = ({ proposal, close }) => {
  const { setVisible, bindings } = useModal()
  const { isCreating, create } = useCreateTask()
  const { state: title, bindings: titleBindings } = useInput(proposal.title || '')
  const { state: body, bindings: descriptionBindings } = useInput(proposal.body || '')
  const { state: compansation, bindings: compansationBindings } = useInput('')
  const [level, setLevel] = React.useState('')

  const submit = (e: any) => {
    e.preventDefault()
    if (isCreating) {
      return
    }

    const data = {
      title,
      body,
      level,
      proposalUrl: proposal.link,
      compansation,
    }
    create(data)
    setVisible(false)
    close()
    e.preventDefault()
  }

  return (
    <div>
      <Button auto type="secondary" onClick={() => setVisible(true)}>
        Create Task
      </Button>
      <Modal width="35rem" {...bindings}>
        <Modal.Title>Create task</Modal.Title>
        <Modal.Content>
          <form onSubmit={submit}>
            <Grid.Container gap={2}>
              <Grid xs={24}>
                <Input
                  width="100%"
                  placeholder="Title"
                  {...titleBindings}
                  value={title}
                  // disabled={Boolean(proposal.title)}
                />
              </Grid>
              <Grid xs={24}>
                <Textarea
                  width="100%"
                  placeholder="Description"
                  {...descriptionBindings}
                  value={body}
                  rows={6}

                  // disabled={Boolean(proposal.body)}
                />
              </Grid>
              <Grid xs={24}>
                <Input
                  width="100%"
                  labelRight="ETH"
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
                >
                  Proposer
                </Input>
              </Grid>
              <Spacer h={2} />

              <Grid xs={24}>
                <Button loading={isCreating} width="100%" htmlType="submit">
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
