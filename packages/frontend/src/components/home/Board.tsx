import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Trello from 'react-trello'
import { Card, Spinner, useTheme } from '@geist-ui/react'
import { ethers } from 'ethers'
import useTasks from '../../hooks/useTasks'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Available',
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins',
          draggable: false,
        },
        {
          id: 'Card2',
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins',
          metadata: { sha: 'be312a1' },
        },
      ],
    },
    {
      id: 'lane2',
      title: 'Claimed',
      label: '0/0',
      cards: [],
    },
    {
      id: 'lane3',
      title: 'Review',
      label: '0/0',
      cards: [],
    },
    {
      id: 'lane4',
      title: 'Completed',
      label: '0/0',
      cards: [],
    },
  ],
}

const StyledBoard = styled(Trello)`
  background: transparent;
  width: 100%;
`

const Board: FC = () => {
  const { tasks, loading } = useTasks()

  console.log({ tasks, loading })
  const theme = useTheme()

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id}>
          Bounty id: {ethers.utils.formatEther(task.id)}
          <div>Title: {task.data?.title}</div>
          <div>Description: {task.data?.body}</div>
          <div>proposalUrl: {task.data?.proposalUrl}</div>
        </Card>
      ))}
    </div>
  )

  return <StyledBoard data={data} />
}

export default Board
