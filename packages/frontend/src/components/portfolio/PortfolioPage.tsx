import * as React from 'react'
import { FC } from 'react'
import { User } from '@geist-ui/react'
import { useUserContext } from '../../contexts/UserContext'

type Props = {}

const PortfolioPage: FC<Props> = () => {
  const { user } = useUserContext()

  return (
    <div>
      <User text="W" name={user.ipfsContract}>
        {user.id}
      </User>
    </div>
  )
}

export default PortfolioPage
