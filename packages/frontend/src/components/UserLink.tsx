import * as React from 'react'
import { FC } from 'react'
import { User } from '@geist-ui/react'
import { formatAddressToShort } from '../utils/formatters'

type Props = {
  address: string
  link?: boolean
}

const UserLink: FC<Props> = ({ address, link }) => {
  return (
    <User
      paddingLeft="0"
      src="https://unix.bio/assets/avatar.png"
      name={formatAddressToShort(address)}
    >
      {!link && 'Task validator'}
    </User>
  )
}

export default UserLink
