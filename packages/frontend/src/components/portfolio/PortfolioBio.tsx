import * as React from 'react'
import { FC } from 'react'
import Markdown from 'markdown-to-jsx'
import { useUserContext } from '../../contexts/UserContext'

const PortfolioExperience: FC = () => {
  const { user } = useUserContext()
  return <Markdown>{user.bio}</Markdown>
}

export default PortfolioExperience
