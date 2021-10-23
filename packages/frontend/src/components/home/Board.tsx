import * as React from 'react'
import { FC } from 'react'
import { Card, Grid, Spacer, Spinner, Text, useTheme } from '@geist-ui/react'
import TasksList from './TasksList'
import useTasks from '../../hooks/useTasks'

const Board: FC = () => {
  const { tasks, loading } = useTasks()

  console.log({ tasks, loading })
  const theme = useTheme()

  if (loading) {
    return <Spinner />
  }

  const openTasks = tasks.filter((task) => true)
  return (
    <>
      <Grid.Container>
        <Grid xs={6} direction="column">
          <Text h3>Open</Text>
          <TasksList tasks={openTasks} />
        </Grid>
        <Grid xs={6} direction="column">
          <Text h3>Claimed</Text>
        </Grid>
        <Grid xs={6} direction="column">
          <Text h3>Review</Text>
        </Grid>
        <Grid xs={6} direction="column">
          Done
        </Grid>
      </Grid.Container>
      <Spacer h={4} />
    </>
  )
}

export default Board
