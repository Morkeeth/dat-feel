import * as React from 'react'
import { FC } from 'react'
import CreateTaskModal from './CreateTaskModal'

type Props = {}

const HomePage: FC<Props> = () => {
  return (
    <div>
      <CreateTaskModal />
    </div>
  )
}

export default HomePage
