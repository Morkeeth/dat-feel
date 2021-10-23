import { Card, Grid } from '@geist-ui/react'
import { ethers } from 'ethers'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import TaskAction from './TaskAction'
import TaskEntity from '../../stores/entities/TaskEntity'
import StatusDot from '../StatusDot'

type Props = {
  tasks: TaskEntity[]
}

const TasksList: FC<Props> = ({ tasks }) => {
  return (
    <Grid.Container gap={3}>
      {tasks.map((task) => (
        <Grid key={task.id} direction="column">
          <Card width="100%">
            {/* Bounty id: {ethers.utils.formatEther(task.id)} */}
            <div>Title: {task.data?.title}</div>
            <div>Description: {task.data?.body}</div>
            <div>proposalUrl: {task.data?.proposalUrl}</div>
            <div>price: {ethers.utils.formatEther(task.amount)} ETH</div>
            <StatusDot status={task.status} />
            <TaskAction task={task} />
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default observer(TasksList)
