import { Grid, Spinner } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import useTasksFromGovernance from '../../hooks/useTasksFromGovernance'

type Props = {}

const TaskList: FC<Props> = () => {
  const { data, status } = useTasksFromGovernance()

  if (status === 'loading') {
    return <Spinner />
  }
  console.log(data)
  const items = []

  return (
    <Grid.Container gap={4}>
      {data.map((item) => (
        <Grid key={item.id} xs={8}>
          {item.title}
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default TaskList
