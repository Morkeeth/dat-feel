import * as React from 'react'
import { FC } from 'react'
import { Spacer, Text } from '@geist-ui/react'
import Markdown from 'markdown-to-jsx'
import styled from 'styled-components'

const Container = styled.div`
  text-align: left;
`

type Props = {
  bioContent: string
}

const TaskDescription: FC<Props> = ({ bioContent }) => {
  return (
    <Container>
      <Text h4 type="secondary">
        Description
      </Text>
      {bioContent && <Markdown>{bioContent}</Markdown>}
      <Spacer h={2} />
    </Container>
  )
}

export default TaskDescription
