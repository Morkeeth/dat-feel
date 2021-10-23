import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Trello from 'react-trello'
import { useTheme } from '@geist-ui/react'

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
  const theme = useTheme()

  return <StyledBoard data={data} />
}

export default Board
