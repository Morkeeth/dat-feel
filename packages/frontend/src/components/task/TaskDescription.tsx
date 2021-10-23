import * as React from 'react'
import { FC } from 'react'
import { Spacer, Text } from '@geist-ui/react'
import Markdown from 'markdown-to-jsx'

type Props = {
  bioContent: string
}

const TaskDescription: FC<Props> = ({ bioContent }) => {
  return (
    <div>
      <Text h3>Description</Text>
      <Markdown>{bioContent}</Markdown>
      <Spacer h={2} />
    </div>
  )
}

export default TaskDescription
