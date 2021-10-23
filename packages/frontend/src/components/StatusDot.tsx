import { Dot } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { TaskStatus } from '../config/enums'

type Props = {
  status: TaskStatus
}

const StatusDot: FC<Props> = ({ status }) => {
  return (
    <div>
      <Dot type="success" /> {status}
    </div>
  )
}

export default StatusDot
