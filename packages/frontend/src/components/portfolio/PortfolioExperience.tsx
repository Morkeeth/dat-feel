import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Grid } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import TaskCard from '../task/TaskCard'
import { useUserContext } from '../../contexts/UserContext'

const PortfolioExperience: FC = () => {
  const { completedTasks } = useUserContext()

  console.log(completedTasks)
  return (
    <Grid.Container gap={1}>
      {completedTasks.map((task) => (
        <Grid key={task.id} xs={24} md={12} justify="flex-start">
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default observer(PortfolioExperience)
