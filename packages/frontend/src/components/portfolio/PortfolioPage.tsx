import * as React from 'react'
import { FC } from 'react'
import PortfolioHeader from './PortfolioHeader'
/* import PortfolioExperienceTable from './PortfolioExperienceTable' */
import { useUserContext } from '../../contexts/UserContext'
import PortfolioTabs from './PortfolioTabs'

type Props = {}

const PortfolioPage: FC<Props> = () => {
  const { user } = useUserContext()

  return (
    <div>
      <PortfolioHeader user={user} />
      <PortfolioTabs user={user} />
      {/* <PortfolioExperienceTable user={user} /> */}
    </div>
  )
}

export default PortfolioPage
