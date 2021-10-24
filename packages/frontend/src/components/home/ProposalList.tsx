import { Grid, Spinner, Text, Card, Radio, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import Markdown from 'markdown-to-jsx'
import styled from 'styled-components'
import CreateTaskModal from './CreateTaskModal'
import { proposalStore } from '../../stores/proposalStore'
import { formatAddressToShort } from '../../utils/formatters'
import useProposalsFromGovernance from '../../hooks/useProposalsFromGovernance'

const StyledMarkdown = styled(Markdown)``
const Body = styled.div`
  h2 {
    font-size: 16px;
  }
  ,
  h3 {
    font-size: 16px;
  }
`
type Props = {
  close: () => void
  orgName: string
}
const ProposalList: FC<Props> = ({ close, orgName }) => {
  const { data, status } = useProposalsFromGovernance(orgName)

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
            <Grid key={item.id} xs={12}>
              <Card width="100%">
                <Text h3>
                  <Markdown>{item.title}</Markdown>
                </Text>
                <Body>{item.body && <StyledMarkdown>{item.body || ''}</StyledMarkdown>}</Body>

                <div>
                  <Text type="secondary" h6>
                    Proposer: {formatAddressToShort(item.proposer.address)}
                  </Text>
                  <Text type="secondary" h6>
                    Date: {item.date.toLocaleDateString()}
                  </Text>
                  <CreateTaskModal close={close} proposal={item} />
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
