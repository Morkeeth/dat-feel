import * as React from 'react'
import { FC } from 'react'
import { Text, Button, Spacer } from '@geist-ui/react'
import { Briefcase } from '@geist-ui/react-icons'
import styled from 'styled-components'
import { ethers } from 'ethers'
import TaskStatusDot from './TaskStatusDot'
import { Task } from '../../types'
import GradientText from '../GradientText'
import Countup from '../Countup'
import { useTaskContext } from '../../contexts/TaskContext'
import TaskAction from '../home/TaskAction'

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

const TitleWrap = styled.div`
  text-align: left;
`

const PriceWrap = styled.div`
  text-align: right;
  min-width: 150px;
`

type Props = {
  closeModal: () => void
}

const TaskHeader: FC<Props> = ({ closeModal }) => {
  const { task } = useTaskContext()
  return (
    <div>
      <TopWrapper>
        <TitleWrap>
          <TaskStatusDot status={task.status} />
          <StyledTitle h3>{task.data?.title}</StyledTitle>
          <FlexWrapper>
            <UnderTitle type="secondary">
              <Briefcase size={12} /> {task.orgName}
            </UnderTitle>
            <Text style={{ margin: 0 }} type="secondary">
              • Created at {task.createdAt}
            </Text>
          </FlexWrapper>
        </TitleWrap>
        <PriceWrap>
          <GradientText
            b
            h3
            style={{ marginRight: '10px' }}
            fromColor="rgb(255, 159, 225)"
            toColor="rgb(135, 39, 255)"
          >
            {task.amount && (
              <div>
                <Countup value={ethers.utils.formatEther(task.amount)} /> ETH
              </div>
            )}
          </GradientText>
          <TaskAction task={task} onSuccess={closeModal} />
        </PriceWrap>
      </TopWrapper>
      <Spacer h={2} />
    </div>
  )
}

export default TaskHeader
