import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Text, Tag } from '@geist-ui/react'
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

const StyledLogo = styled.img`
  min-width: 100px;
  min-height: 100px;
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
`

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`

const StyledTag = styled(Tag)`
  margin-right: 10px !important;
`

const TitleWrap = styled.div``

type Props = { org: OrgMetaData }

const OrgHero: FC<Props> = ({ org }) => {
  return (
    <Container>
      {/* <img src={org.header} />
      <Logo>
        <img src={org.logo} />
      </Logo> */}
      <LogoWrap>
        <StyledLogo src={org.logo} />
        <TitleWrap>
          <Text h1 style={{ margin: 0 }}>
            {org.name}
          </Text>
          <StyledTag type="secondary">Tasks completed: {org.tasks}</StyledTag>
          <StyledTag type="secondary">TVL: {org.tvl}</StyledTag>
        </TitleWrap>
      </LogoWrap>
    </Container>
  )
}

export default OrgHero
