import { Card, Grid } from '@geist-ui/react'
import { ethers } from 'ethers'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TaskAction from './TaskAction'
import TaskEntity from '../../stores/entities/TaskEntity'
import StatusDot from '../StatusDot'
import { TaskStatus } from '../../config/enums'
import TaskCard from '../task/TaskCard'

type Props = {
  tasks: TaskEntity[]
}

const Column = styled(Grid.Container)`
  max-width: 100%;
`

const TasksList: FC<Props> = ({ tasks }) => {
  const items = tasks
    .slice()
    .sort((a, b) => Number(b.deadline.toString()) - Number(a.deadline.toString()))
  return (
    <Column gap={3}>
      {tasks.map((task) => (
        <Grid key={task.id} direction="column">
          <TaskCard task={task} />
        </Grid>
      ))}
    </Column>
  )
}

export default observer(TasksList)
