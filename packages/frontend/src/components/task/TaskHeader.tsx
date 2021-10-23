import * as React from 'react'
import { FC } from 'react'
import { Text, Badge, Button } from '@geist-ui/react'
import styled from 'styled-components'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'
import GradientText from '../GradientText'

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const TaskPage: FC<Task> = ({ task }) => {
  return (
    <div>
      <TopWrapper>
        <div>
          <Badge>{task.organization}</Badge>
          <StyledTitle h2>
            {task.title}
            <Text span type="secondary">
              {' '}
              ${task.price}
            </Text>
          </StyledTitle>
        </div>
        <Button auto ghost type="success">
          Apply
        </Button>
      </TopWrapper>
      <TaskStatus status={task.status} />
    </div>
  )
}

export default TaskPage
