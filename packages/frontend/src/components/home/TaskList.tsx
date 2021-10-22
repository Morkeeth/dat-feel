import { Grid, Spinner, Text, Card, Radio, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import CreateTaskModal from './CreateTaskModal'
import { proposalStore } from '../../stores/proposalStore'
import { formatAddressToShort } from '../../utils/formatters'
import useProposalsFromGovernance from '../../hooks/useProposalsFromGovernance'

const ProposalList: FC = () => {
  const { data, status } = useProposalsFromGovernance()

  return (
    <div>
      <Radio.Group
        value={proposalStore.governanceSource}
        onChange={(value: any) => proposalStore.setSource(value)}
      >
        <Radio value="tally">Tally </Radio>
        <Radio value="snapshot">Snapshot</Radio>
      </Radio.Group>
      <Spacer h={2} />
      {status === 'loading' && <Spinner />}
      {status === 'success' && (
        <Grid.Container gap={4}>
          {data?.map((item) => (
            <Grid key={item.id} xs={8}>
              <Card>
                <Text h3>{item.title}</Text>
                <div>
                  <Text h6>Proposer: {formatAddressToShort(item.proposer.address)}</Text>
                  <CreateTaskModal proposal={item} />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}
    </div>
  )
}

export default observer(ProposalList)
