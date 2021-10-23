import * as React from 'react'
import { FC } from 'react'
import { Text, User } from '@geist-ui/react'

type Props = {
  validator: string
}

const TaskContact: FC<Props> = ({ validator }) => {
  return (
    <div>
      <Text h3>Contact</Text>
      <User src="https://unix.bio/assets/avatar.png" name={validator}>
        Task validator
      </User>
    </div>
  )
}

export default TaskContact
