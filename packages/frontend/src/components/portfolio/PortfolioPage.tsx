import * as React from 'react'
import { FC } from 'react'
import PortfolioHeader from './PortfolioHeader'
/* import PortfolioExperienceTable from './PortfolioExperienceTable' */
import PortfolioExperience from './PortfolioExperience'
import { useUserContext } from '../../contexts/UserContext'

type Props = {}

const PortfolioPage: FC<Props> = () => {
  const { user } = useUserContext()

  return (
    <div>
      <PortfolioHeader user={user} />
      <PortfolioExperience user={user} />
      {/* <PortfolioExperienceTable user={user} /> */}
    </div>
  )
}

export default PortfolioPage
