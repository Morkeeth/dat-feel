import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Card, Grid, Text, Tabs, Spacer } from '@geist-ui/react'
import { CheckInCircle } from '@geist-ui/react-icons'
import styled from 'styled-components'
import TaskStatus from '../task/TaskStatus'
import PortfolioExperience from './PortfolioExperience'
import PortfolioBio from './PortfolioBio'

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

const PortfolioTabs: FC = ({ user }) => {
  /*   const renderAction = (value, rowData, rowIndex) => {
    return <Link href={`/task/${rowData.id}`}>View task</Link>
  } */

  return (
    <div>
      <Tabs initialValue="1">
        <Tabs.Item
          label={
            <>
              <CheckInCircle /> Experience
            </>
          }
          value="1"
        >
          <PortfolioExperience user={user} />
        </Tabs.Item>
        <Tabs.Item
          label={
            <>
              <CheckInCircle /> Bio
            </>
          }
          value="2"
        >
          <PortfolioBio user={user} />
        </Tabs.Item>
      </Tabs>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioTabs
