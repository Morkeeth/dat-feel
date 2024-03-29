import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { CheckInCircle } from '@geist-ui/react-icons'
import { Text, Spacer, Avatar } from '@geist-ui/react'
import { useUserContext } from '../../contexts/UserContext'
import { formatAddressToShort } from '../../utils/formatters'
import Countup from '../Countup'

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

const PortfolioHeader: FC = () => {
  const { user } = useUserContext()

  return (
    <div>
      <AvatarWrapper>
        <StyledAvatar src="https://unix.bio/assets/avatar.png" text={user.id[0].toUpperCase()} />
        <Title h2>
          {formatAddressToShort(user.id)} <VerifiedIcon size={20} />
        </Title>
        <SubTitle p type="secondary">
          {user.xp} experience
        </SubTitle>
      </AvatarWrapper>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioHeader
