import { FC } from 'react'
import { Button as GeistButton, ButtonProps } from '@geist-ui/react'

export type Props = ButtonProps & {}

const Button: FC<Props> = ({ children, ...props }) => {
  return <GeistButton {...props}>{children}</GeistButton>
}

export default Button
