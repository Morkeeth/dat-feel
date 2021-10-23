import * as React from 'react'
import { FC } from 'react'
import { Text, Badge, Card } from '@geist-ui/react'
import styled from 'styled-components'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const TaskPage: FC<Task> = ({ task }) => {
  return (
    <div>
      <Card>
        <Badge>{task.organization}</Badge>
        <StyledTitle h2>
          {task.title}
          <Text span type="secondary">
            {' '}
            ${task.price}
          </Text>
        </StyledTitle>
        <TaskStatus status={task.status} />
      </Card>
    </div>
  )
}

export default TaskPage
