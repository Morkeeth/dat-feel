import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { TaskStatus } from '../../config/enums'
import TaskEntity from '../../stores/entities/TaskEntity'
import { web3Store } from '../../stores/web3Store'
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

    return <Button auto onClick={fullfill}>Submit task</Button>
  }

  const acceptTask = () => {}

  if (task.status === TaskStatus.REVIEW && task.creator === account) {
    return <Button auto onClick={acceptTask}>Accept</Button>
  }

  return null
}

export default observer(TaskAction)
