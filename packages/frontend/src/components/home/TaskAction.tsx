import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { TaskStatus } from '../../config/enums'
import TaskEntity from '../../stores/entities/TaskEntity'
import useWeb3 from '../../web3/useWeb3'

type Props = {
  task: TaskEntity
}

const TaskAction: FC<Props> = ({ task }) => {
  const { isConnected, account } = useWeb3()

  if (!isConnected) {
    return null
  }

  if (task.status === TaskStatus.OPEN) {
    const fullfill = () => {
      task.fullfill()
    }

    if (task.creator === account) {
      return null
    }

    return <Button onClick={fullfill}>Fullfill</Button>
  }

  const acceptTask = () => {
    task.acceptTask()
  }

  if (task.status === TaskStatus.REVIEW && task.creator === account) {
    return <Button onClick={acceptTask}>Accept</Button>
  }

  return null
}

export default observer(TaskAction)
