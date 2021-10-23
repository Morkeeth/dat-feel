import { Card, Grid } from '@geist-ui/react'
import { ethers } from 'ethers'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import TaskAction from './TaskAction'
import TaskEntity from '../../stores/entities/TaskEntity'
import StatusDot from '../StatusDot'
import TaskCard from '../task/TaskCard'

type Props = {
  tasks: TaskEntity[]
}

const TasksList: FC<Props> = ({ tasks }) => {
  return (
    <Grid.Container gap={3}>
      {tasks.map((task) => (
        <Grid key={task.id} direction="column">
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default observer(TasksList)
