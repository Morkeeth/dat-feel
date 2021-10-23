import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { CheckInCircle } from '@geist-ui/react-icons'
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

const VerifiedIcon = styled(CheckInCircle)`
  stroke-width: 3px;
`

const PortfolioHeader: FC = ({ user }) => {
  return (
    <div>
      <AvatarWrapper>
        <StyledAvatar src="https://unix.bio/assets/avatar.png" text={user.id[0].toUpperCase()} />
        <Title h2>
          {user.id} <VerifiedIcon size={20} />
        </Title>
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
