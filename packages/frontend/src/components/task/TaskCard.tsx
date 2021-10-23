import * as React from 'react'
import { FC } from 'react'
import { Text, Card } from '@geist-ui/react'
import styled from 'styled-components'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'
import Link from 'next/link'

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`

const TaskCard: FC<Task> = ({ task }) => {
  return (
    <Link href={`/task/${task.id}`} passHref>
      <StyledCard width="100%" key={task.id} hoverable>
        <TopWrapper>
          <StyledTitle h4>{task.title}</StyledTitle>
          <Text span type="secondary">
            {' '}
            ${task.price}
          </Text>
        </TopWrapper>
        <TaskStatus status={task.status} />
        <Text>{task.description}</Text>
      </StyledCard>
    </Link>
  )
}

export default TaskCard
