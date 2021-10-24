import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Text, Card, useModal, Link } from '@geist-ui/react'
import styled from 'styled-components'
import Markdown from 'markdown-to-jsx'
import TaskStatusDot from './TaskStatusDot'
import TaskModal from './TaskModal'
import GradientText from '../GradientText'
import { formatBigNumber } from '../../utils/formatters'
import Countup from '../Countup'
import TaskEntity from '../../stores/entities/TaskEntity'
import { TaskStatus } from '../../config/enums'
import UserLink from '../UserLink'

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled(Text)`
  margin-top: 10px;
  overflow: hidden;
`

const StyledCard = styled(Card)`
  min-height: 200px;
  &:hover {
    cursor: pointer;
  }
`

const TaskCard: FC<{ task: TaskEntity }> = ({ task }) => {
  const { setVisible, bindings } = useModal()

  return (
    // <Link href={`/task/${task.id}`} passHref>
    <>
      <StyledCard width="100%" key={task.id} hoverable onClick={() => setVisible(true)}>
        <TopWrapper>
          <TaskStatusDot status={task?.status} />
          {task.status !== TaskStatus.OPEN && <UserLink link address={task.fullfiller} />}
          <GradientText span b fromColor="rgb(255, 159, 225)" toColor="rgb(135, 39, 255)">
            <Countup value={formatBigNumber(task?.amount)} /> ETH
          </GradientText>
        </TopWrapper>
        <StyledTitle h4>{task.data?.title}</StyledTitle>
      </StyledCard>
      <TaskModal task={task} closeModal={() => setVisible(false)} bindings={bindings} />
    </>
    // </Link>
  )
}

export default observer(TaskCard)
