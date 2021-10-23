import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { OrgMetaData } from '../../types'

const Container = styled.div`
  position: relative;
`
const Logo = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 112;
  bottom: 0;
  transform: translate(40px, 50%);
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`

type Props = { org: OrgMetaData }

const OrgHero: FC<Props> = ({ org }) => {
  return (
    <Container>
      <img src={org.header} />
      <Logo>
        <img src={org.logo} />
      </Logo>
    </Container>
  )
}

export default OrgHero
