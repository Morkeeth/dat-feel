import * as React from 'react'
import { FC } from 'react'
import { User, Text, Spacer } from '@geist-ui/react'

const PortfolioHeader: FC = ({ user }) => {
  return (
    <div>
      <Text h2>User</Text>
      <User text={user.id[0].toUpperCase()} name={user.id}>
        {user.xp} experience
      </User>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioHeader
