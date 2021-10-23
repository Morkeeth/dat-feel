import * as React from 'react'
import { FC } from 'react'
import { Card, Grid, Spacer, Spinner, Text, useTheme } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import TasksList from './TasksList'
import useTasks from '../../hooks/useTasks'
import { TaskStatus } from '../../config/enums'

type Props = {
  owner?: string
}

const Board: FC<Props> = ({ owner }) => {
  const { tasks, loading } = useTasks(owner)
  const theme = useTheme()

  if (loading) {
    return <Spinner />
  }

  const openTasks = tasks.filter((task) => task.status === TaskStatus.OPEN)
  const reviewTasks = tasks.filter((task) => task.status === TaskStatus.REVIEW)

  return (
    <>
      <Grid.Container>
        <Grid xs={8} direction="column">
          <Text h3>Open</Text>
          <TasksList tasks={openTasks} />
        </Grid>

        <Grid xs={8} direction="column">
          <Text h3>Review</Text> <TasksList tasks={reviewTasks} />
        </Grid>
        <Grid xs={8} direction="column">
          <Text h3>Done</Text>
        </Grid>
      </Grid.Container>
      <Spacer h={4} />
    </>
  )
}

export default observer(Board)
