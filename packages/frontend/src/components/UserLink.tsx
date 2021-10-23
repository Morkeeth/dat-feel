import * as React from 'react'
import { FC } from 'react'
import { User } from '@geist-ui/react'
import Link from 'next/link'
import { formatAddressToShort } from '../utils/formatters'

type Props = {
  address: string
  label: string
  link?: boolean
}

const UserLink: FC<Props> = ({ address, label, link, ...props }) => {
  const node = (
    <User
      {...props}
      onClick={(e) => e.stopPropagation()}
      paddingLeft="0"
      src="https://unix.bio/assets/avatar.png"
      name={formatAddressToShort(address)}
    >
      {label}
    </User>
  )

  if (link) return <Link href={`/user/${address}`}>{node}</Link>

  return node
}

export default UserLink
