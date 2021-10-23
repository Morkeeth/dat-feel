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
  return (
    <Grid.Container gap={3}>
      {tasks.map((task) => (
        <Grid key={task.id} direction="column">
          <TaskCard task={task} />
          <Card width="100%">
            <div>Title: {task.data?.title}</div>
            <div>Description: {task.data?.body}</div>
            <div>proposalUrl: {task.data?.proposalUrl}</div>
            <div>price: {ethers.utils.formatEther(task.amount)} ETH</div>
            <div>{task.status === TaskStatus.REVIEW && <div>Assigned: {task.fullfiller}</div>}</div>

            <StatusDot status={task.status} />
            <TaskAction task={task} />
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default observer(TasksList)
