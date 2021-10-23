import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import TaskEntity from '../../stores/entities/TaskEntity'
import { web3Store } from '../../stores/web3Store'
import useWeb3 from '../../web3/useWeb3'

type Props = {
  task: TaskEntity
}

const TaskAction: FC<Props> = ({ task }) => {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    return null
  }

  const apply = () => {
    // const contract = StandardBounties__factory.connect(address, signer)
    // await contract.issueAndContribute(
    //   account as string,
    //   [],
    //   [account],
    //   url,
    //   BigNumber.from('0'),
    //   '0xBA78CD28F7132958235D278fF3C5DC5E6d34cc15',
    //   BigNumber.from('0'),
    //   ethers.utils.parseEther(compansation),
    //   { value: ethers.utils.parseEther(compansation) }
    // )

    task.apply()
  }

  return <Button onClick={apply}>Apply</Button>
}

export default observer(TaskAction)
