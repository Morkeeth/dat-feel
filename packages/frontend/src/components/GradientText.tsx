import { FC } from 'react'
import { Text } from '@geist-ui/react'
import styled from 'styled-components'

const StyledText = styled(Text)<{ fromColor: string; toColor: string }>`
  background: linear-gradient(
    to right,
    ${(props) => props.fromColor} 0%,
    ${(props) => props.toColor} 100%
  );
  width: max-content;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

type Props = {
  fromColor: string
  toColor: string
}

const GradientText: FC<Props> = ({ children, fromColor, toColor, ...props }) => {
  return (
    <StyledText {...props} fromColor={fromColor} toColor={toColor}>
      {children}
    </StyledText>
  )
}

export default GradientText
