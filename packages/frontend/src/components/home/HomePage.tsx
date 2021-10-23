import { Spacer, Collapse } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import ProposalList from './ProposalList'
import Board from './Board'
import OrgHero from './OrgHero'
import useIsOrgOwner from '../../hooks/useIsOrgOwner'
import { OrgMetaData } from '../../types'

type Props = { org: OrgMetaData }

const HomePage: FC<Props> = ({ org }) => {
  const isOwner = useIsOrgOwner()
  return (
    <div>
      <OrgHero org={org} />
      <Spacer h={5} />
      {isOwner && (
        <>
          <Collapse
            shadow
            title="Governance proposals"
            subtitle="Create a task from one of your proposals"
          >
            <ProposalList />
          </Collapse>
          <Spacer h={4} />
        </>
      )}

      <Board />
    </div>
  )
}

export default HomePage
