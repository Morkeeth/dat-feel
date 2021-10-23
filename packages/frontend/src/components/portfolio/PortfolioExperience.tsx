import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Card, Grid, Text, Badge, Spacer } from '@geist-ui/react'
import TaskStatus from '../task/TaskStatus'
import styled from 'styled-components'

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const PortfolioExperience: FC = ({ user }) => {
  /*   const renderAction = (value, rowData, rowIndex) => {
    return <Link href={`/task/${rowData.id}`}>View task</Link>
  } */

  return (
    <div>
      <Text h2>Experience</Text>
      <Grid.Container gap={2}>
        {user.completedTasks.map((task) => (
          <Grid key={task.id} xs={8} justify="flex-start">
            <Link href={`/task/${task.id}`} passHref>
              <Card width="100%" key={task.id} hoverable>
                <TopWrapper>
                  <StyledTitle h4>{task.title}</StyledTitle>
                  <Text span type="secondary">
                    {' '}
                    ${task.price}
                  </Text>
                </TopWrapper>
                <TaskStatus status={task.status} />
                <Text>{task.description}</Text>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioExperience
