import * as React from 'react'
import { FC } from 'react'
import { Text, Dot } from '@geist-ui/react'
import { TaskStatus } from '../../config/enums'

type Props = {
  status: TaskStatus
}

const TaskStatusDot: FC<Props> = ({ status }) => {
  const dotType = (): string => {
    if (!status) {
      return 'success'
    }
    if (status === TaskStatus.OPEN) {
      return 'success'
    }
    if (status === TaskStatus.REVIEW) {
      return 'warning'
    }
    if (status === TaskStatus.COMPLETE) {
      return 'secondary'
    }
  }

  return (
    <Dot style={{ marginRight: '20px' }} type={dotType(status)}>
      <Text b span type="secondary">
        {status}
      </Text>
    </Dot>
  )
}

export default TaskStatusDot
