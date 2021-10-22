import * as React from 'react'
import { FC } from 'react'
import { Page as GeistPage, PageProps } from '@geist-ui/react'

type Props = PageProps

const Page: FC<Props> = ({ children }) => <GeistPage>{children}</GeistPage>

export default Page
