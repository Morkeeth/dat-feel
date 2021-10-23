import * as React from 'react'
import { FC } from 'react'
import { Text, Badge } from '@geist-ui/react'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'
import styled from 'styled-components'

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const TaskPage: FC<Task> = ({ task }) => {
  return (
    <div>
      <Badge>{task.organization}</Badge>
      <StyledTitle h2>
        {task.title}
        <Text span type="secondary">
          {' '}
          ${task.price}
        </Text>
      </StyledTitle>
      <TaskStatus status={task.status} />
    </div>
  )
}

export default TaskPage
