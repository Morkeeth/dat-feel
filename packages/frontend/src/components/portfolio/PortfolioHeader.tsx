import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Dot, Text, Spacer, Avatar } from '@geist-ui/react'

const StyledAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
`

const AvatarWrapper = styled.div`
  text-align: center;
`

const Title = styled(Text)`
  margin: 0;
`

const SubTitle = styled(Text)`
  margin: 0;
`

const PortfolioHeader: FC = ({ user }) => {
  return (
    <div>
      <AvatarWrapper>
        <StyledAvatar text={user.id[0].toUpperCase()} />
        <Title h2>{user.id}</Title>
        <SubTitle p type="secondary">
          {user.xp} experience • Joined {user.completedTasks[0].completedAt}
        </SubTitle>
      </AvatarWrapper>

      {/* <User text={user.id[0].toUpperCase()} name={user.id}>
        {user.xp} experience
      </User> */}
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioHeader
