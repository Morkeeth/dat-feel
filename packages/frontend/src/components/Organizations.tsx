import { Grid, Spacer, Spinner, Text } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { orgStore } from '../stores/orgStore'

const Logo = styled.div`
  width: 150px;
  height: 150px;
`

const Organizations: FC = () => {
  const loading = orgStore.isLoading
  const orgz = orgStore.orgs

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
              <Link href={`/dao/${org.url}`} passHref>
                <a>
                  <img src={org.logoUri} />
                </a>
              </Link>
            </Logo>
            <Spacer h={1} />
            <Text style={{ margin: 0, textAlign: 'center' }} type="secondary">
              {org.name}
            </Text>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={3} />
    </div>
  )
}

export default observer(Organizations)
