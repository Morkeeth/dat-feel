import * as React from 'react'
import { FC } from 'react'
import { Text, Dot, Badge } from '@geist-ui/react'
import { Task } from '../../types'

const TaskPage: FC<Task> = ({ task }) => {
  return (
    <div>
      <Badge>{task.organization}</Badge>
      <Text h1>
        {task.title}
        <Text span type="secondary">
          {' '}
          ${task.price}
        </Text>
      </Text>
      <Dot style={{ marginRight: '20px' }} type="success">
        <Text b span type="secondary">
          {task.status}
        </Text>
      </Dot>
    </div>
  )
}

export default TaskPage
