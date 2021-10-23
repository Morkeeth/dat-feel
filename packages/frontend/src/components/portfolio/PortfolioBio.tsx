import * as React from 'react'
import { FC } from 'react'
import { Text } from '@geist-ui/react'
import { useUserContext } from '../../contexts/UserContext'

const PortfolioExperience: FC = () => {
  const { user } = useUserContext()
  return (
    <Text mt={0}>
      Turning coffee into code{' '}
      <span role="img" aria-label="farmer">
        👨‍🌾
      </span>
    </Text>
  )
}

export default PortfolioExperience
