import * as React from 'react'
import { FC } from 'react'
import { Text, Card } from '@geist-ui/react'
import styled from 'styled-components'
import Link from 'next/link'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'
import GradientText from '../GradientText'
import { formatBigNumber } from '../../utils/formatters'
import Countup from '../Countup'

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled(Text)`
  margin-top: 10px;
`

const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`

const TaskCard: FC<Task> = ({ task }) => {
  return (
    <Link href={`/task/${task.data?.proposalUrl}`} passHref>
      <StyledCard width="100%" key={task.id} hoverable>
        <TopWrapper>
          <TaskStatus status={task.status} />
          <GradientText span b fromColor="red" toColor="yellow">
            <Countup value={formatBigNumber(task?.amount)} /> ETH
          </GradientText>
        </TopWrapper>
        <StyledTitle h4>{task.data?.title}</StyledTitle>
        <Text>{task.data?.body}</Text>
      </StyledCard>
    </Link>
  )
}

export default TaskCard
