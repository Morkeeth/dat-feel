import { Spacer, Collapse } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import useIsOrgOwner from '../../hooks/useIsOrgOwner'
import { OrgMetaData } from '../../types'
import Board from '../home/Board'
import OrgHero from '../home/OrgHero'
import ProposalList from '../home/ProposalList'

type Props = { org: OrgMetaData }

const DAOPage: FC<Props> = ({ org }) => {
  const isOwner = useIsOrgOwner(org)
  const [randomKey, setRandomKey] = React.useState('')
  return (
    <div>
      <OrgHero org={org} />
      <Spacer h={5} />
      <Board owner={org.owner} />
      <Spacer h={1} />
      {isOwner && (
        <>
          <Collapse
            key={randomKey}
            shadow
            title="Governance proposals"
            subtitle="Create a task from one of your proposals"
          >
            <ProposalList orgName={org.url} close={() => setRandomKey(Math.random().toString())} />
          </Collapse>
          <Spacer h={4} />
        </>
      )}
    </div>
  )
}

export default DAOPage
