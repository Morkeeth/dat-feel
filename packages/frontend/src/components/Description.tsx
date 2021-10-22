import { FC } from 'react'
import { Description as GeistDescription, DescriptionProps } from '@geist-ui/react'

export type Props = DescriptionProps & {}

const Description: FC<Props> = ({ children, ...props }) => {
  return <GeistDescription {...props}>{children}</GeistDescription>
}

export default Description
