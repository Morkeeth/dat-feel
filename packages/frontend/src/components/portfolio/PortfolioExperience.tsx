import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Grid } from '@geist-ui/react'
import TaskCard from '../task/TaskCard'

const PortfolioExperience: FC = ({ user }) => {
  /*   const renderAction = (value, rowData, rowIndex) => {
    return <Link href={`/task/${rowData.id}`}>View task</Link>
  } */

  return (
    <Grid.Container gap={1}>
      {user.completedTasks.map((task) => (
        <Grid key={task.id} xs={24} md={12} justify="flex-start">
          <Link href={`/task/${task.id}`} passHref>
            <TaskCard task={task} />
          </Link>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default PortfolioExperience
