import * as React from 'react'
import { FC } from 'react'
import useAccountBalance from '../hooks/useAccountBalance'
import { formatBigNumber } from '../utils/formatters'

type Props = {}

const UserBalance: FC<Props> = () => {
  const balance = useAccountBalance()

  return <div>balance: {balance && formatBigNumber(balance)}</div>
}

export default UserBalance
