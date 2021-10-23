import { Grid, Spacer, Spinner, Text } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { organizations } from '../config/config'
import { OrgMetaData } from '../types'
import { getDAO } from '../utils/web3-requests'

const Logo = styled.div`
  width: 150px;
  height: 150px;
`
type Props = {}

const Organizations: FC<Props> = () => {
  const [loading, setLoading] = React.useState(true)
  const [orgz, setOrgz] = React.useState<OrgMetaData[]>()

  React.useEffect(() => {
    const start = async () => {
      const result = await Promise.all(organizations.map((org) => getDAO(org)))
      setOrgz(result as any)
      setLoading(false)
    }
    start()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <Text h2>Listed DAOs</Text>
      <Grid.Container gap={3}>
        {orgz?.map((org) => (
          <Grid key={org.name}>
            <Logo>
              <Link href={`/dao/${org.url}`}>
                <a>
                  <img src={org.logo} />
                </a>
              </Link>
            </Logo>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={3} />
    </div>
  )
}

export default Organizations
