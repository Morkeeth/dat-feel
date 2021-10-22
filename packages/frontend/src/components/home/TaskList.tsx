import { Grid, Spinner, Text, Card } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import useTasksFromGovernance from '../../hooks/useTasksFromGovernance'
import { formatAddressToShort } from '../../utils/formatters'

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
          <Card>
            <Text h3>{item.title}</Text>
            <div>
              <Text h6>Proposer: {formatAddressToShort(item.proposer.address)}</Text>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default TaskList
