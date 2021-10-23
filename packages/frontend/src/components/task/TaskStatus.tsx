import * as React from 'react'
import { FC } from 'react'
import { Text, Dot } from '@geist-ui/react'

type Props = {
  status: string
}

const TaskStatus: FC<Props> = ({ status }) => {
  return (
    <div>
      <Dot style={{ marginRight: '20px' }} type="success">
        <Text b span type="secondary">
          {status}
        </Text>
      </Dot>
    </div>
  )
}

export default TaskStatus
