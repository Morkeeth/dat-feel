import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Text, Card } from '@geist-ui/react'
import styled from 'styled-components'
import Link from 'next/link'
import TaskStatus from './TaskStatus'
import { Task } from '../../types'
import GradientText from '../GradientText'
import { formatBigNumber } from '../../utils/formatters'
import Countup from '../Countup'
import TaskAction from '../home/TaskAction'

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

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const TaskCard: FC<{ task: Task }> = ({ task }) => {
  return (
    <Link href={`/task/${task.id}`} passHref>
      <StyledCard width="100%" key={task.id} hoverable>
        <TopWrapper>
          <TaskStatus status={task?.status} />
          <GradientText span b fromColor="rgb(255, 159, 225)" toColor="rgb(135, 39, 255)">
            <Countup value={formatBigNumber(task?.amount)} /> ETH
          </GradientText>
        </TopWrapper>
        <StyledTitle h4>{task.data?.title}</StyledTitle>
        <Text>{task.data?.body}</Text>
        <ActionWrapper>
          <TaskAction task={task} />
        </ActionWrapper>
      </StyledCard>
    </Link>
  )
}

export default observer(TaskCard)
