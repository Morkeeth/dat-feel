import { Card, Grid } from '@geist-ui/react'
import { ethers } from 'ethers'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import TaskAction from './TaskAction'
import TaskEntity from '../../stores/entities/TaskEntity'
import StatusDot from '../StatusDot'
import { TaskStatus } from '../../config/enums'
import TaskCard from '../task/TaskCard'

type Props = {
  tasks: TaskEntity[]
}

const TasksList: FC<Props> = ({ tasks }) => {
  const items = tasks
    .slice()
    .sort((a, b) => Number(b.deadline.toString()) - Number(a.deadline.toString()))
  return (
    <Grid.Container gap={3} margin={0}>
      {items.map((task) => (
        <Grid key={task.id} direction="column">
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default observer(TasksList)
