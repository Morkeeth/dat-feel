import * as React from 'react'
import { FC } from 'react'
import { Tabs, Spacer } from '@geist-ui/react'
import { CheckInCircle } from '@geist-ui/react-icons'
import PortfolioExperience from './PortfolioExperience'
import PortfolioBio from './PortfolioBio'

const PortfolioTabs: FC = () => {
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
          <PortfolioExperience />
        </Tabs.Item>
        <Tabs.Item
          label={
            <>
              <CheckInCircle /> Bio
            </>
          }
          value="2"
        >
          <PortfolioBio />
        </Tabs.Item>
      </Tabs>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioTabs
