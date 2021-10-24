import * as React from 'react'
import { FC } from 'react'
import { Link, Spacer, Text, User } from '@geist-ui/react'
import styled from 'styled-components'
import UserLink from '../UserLink'
import { useTaskContext } from '../../contexts/TaskContext'
import { TaskStatus } from '../../config/enums'

const Container = styled.div`
  text-align: left;
`

const StyledUserLink = styled(UserLink)<{ link?: boolean }>`
  &:hover {
    cursor: ${(props) => (props.link ? 'pointer' : 'default')};
  }
`

type Props = {
  validator: string
}

const TaskContact: FC<Props> = () => {
  const { task } = useTaskContext()

  return (
    <Container>
      <Text h4 type="secondary">
        Contact
      </Text>
      <StyledUserLink
        src="https://avatars.dicebear.com/api/adventurer/wall.svg"
        label="Task validator"
        address={task.approvers[0]}
      />
      {task.status !== TaskStatus.OPEN && (
        <StyledUserLink label="Assigned user" address={task.fullfiller} link />
      )}
      {/* 
      <Link target="_blank" href={task.data?.proposalUrl}>
        Proposal link
      </Link> */}
    </Container>
  )
}

export default TaskContact
