import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Card, Grid, Text, Badge, Spacer } from '@geist-ui/react'
import styled from 'styled-components'
import TaskStatus from '../task/TaskStatus'

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled(Text)`
  margin-bottom: 0;
`

const StyledCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`

const PortfolioExperience: FC = ({ user }) => {
  /*   const renderAction = (value, rowData, rowIndex) => {
    return <Link href={`/task/${rowData.id}`}>View task</Link>
  } */

  return (
    <div>
      <Text h3>Experience</Text>
      <Grid.Container gap={2}>
        {user.completedTasks.map((task) => (
          <Grid key={task.id} xs={8} justify="flex-start">
            <Link href={`/task/${task.id}`} passHref>
              <StyledCard width="100%" key={task.id} hoverable>
                <TopWrapper>
                  <StyledTitle h4>{task.title}</StyledTitle>
                  <Text span type="secondary">
                    {' '}
                    ${task.price}
                  </Text>
                </TopWrapper>
                <TaskStatus status={task.status} />
                <Text>{task.description}</Text>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioExperience
