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

  return <Text mt={0}>Turning coffee into code 👨‍🌾</Text>
}

export default PortfolioExperience
