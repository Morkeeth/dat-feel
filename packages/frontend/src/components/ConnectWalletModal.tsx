import * as React from 'react'
import { FC } from 'react'
import { useModal, Button, Modal, Grid } from '@geist-ui/react'
import { connectorsByName } from '../config/connectors'

type Props = {}

const ConnectWalletModal: FC<Props> = () => {
  const { setVisible, bindings } = useModal()

  return (
    <div>
      <Button auto shadow type="secondary" onClick={() => setVisible(true)}>
        Login
      </Button>
      <Modal width="35rem" {...bindings}>
        <Modal.Content>
          <Grid.Container gap={2}>
            {Object.entries(connectorsByName).map(([name, currentConnector]) => {
              return (
                <Grid xs={12} key={name}>
                  <Button
                    width="100%"
                    onClick={() => {
                      // activate(name, currentConnector)
                    }}
                  >
                    {name}{' '}
                  </Button>
                </Grid>
              )
            })}
          </Grid.Container>
          <p>This is the width I want.</p>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ConnectWalletModal
