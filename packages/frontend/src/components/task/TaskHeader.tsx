import * as React from 'react'
import { FC } from 'react'
import { Text, Button, Spacer } from '@geist-ui/react'
import { Briefcase } from '@geist-ui/react-icons'
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

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const UnderTitle = styled(Text)`
  margin-block: 0;
  margin-right: 6px;
`

const TaskHeader: FC<Task> = ({ task }) => {
  return (
    <div>
      <TopWrapper>
        <div>
          <TaskStatus status={task.status} />
          <StyledTitle h2>{task.title}</StyledTitle>
        </div>
        <div>
          <GradientText
            b
            style={{ marginRight: '10px' }}
            fromColor="rgb(255, 159, 225)"
            toColor="rgb(135, 39, 255)"
          >
            ${task.price}
          </GradientText>
          <Button auto ghost type="success">
            Apply
          </Button>
        </div>
      </TopWrapper>
      <FlexWrapper>
        <UnderTitle>
          <Briefcase size={12} /> {task.organization}
        </UnderTitle>
        <Text style={{ margin: 0 }} type="secondary">
          • Created at {task.createdAt}
        </Text>
      </FlexWrapper>
      <Spacer h={2} />
    </div>
  )
}

export default TaskHeader
