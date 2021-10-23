import * as React from 'react'
import { FC, useRef } from 'react'
import styled from 'styled-components'

import useCounter from '../hooks/useCounter'
import { formatNumberToDecimals } from '../utils/formatters'

type Props = {
  value: number | string
}

const Item = styled.span`
  ${(props) => props.theme.mono};
`

const Countup: FC<Props> = ({ value, ...props }) => {
  const nodeRef = useRef<HTMLElement>()
  useCounter({
    value,
    onUpdate: (updated) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = formatNumberToDecimals(updated)
      }
    },
  })

  if (typeof window === 'undefined') {
    return (
      <Item {...props} ref={nodeRef}>
        {value}
      </Item>
    )
  }

  return <Item {...props} ref={nodeRef} />
}

export default Countup
