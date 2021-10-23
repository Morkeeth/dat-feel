import * as React from 'react'
import { FC } from 'react'
import PortfolioHeader from './PortfolioHeader'
import PortfolioTabs from './PortfolioTabs'

const PortfolioPage: FC = () => {
  return (
    <div>
      <PortfolioHeader />
      <PortfolioTabs />
    </div>
  )
}

export default PortfolioPage
