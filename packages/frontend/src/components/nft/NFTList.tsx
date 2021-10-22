import { Grid, Card, Image, Text, Button, Spacer, Description } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { MarketItem } from '../../config/types'
import { useMarketContext } from '../../contexts/MarketContext'
import { formatAddressToShort, formatBigNumber } from '../../utils/formatters'
import useWeb3 from '../../web3/useWeb3'

type Props = {
  items: MarketItem[]
  isMine?: boolean
}

const NFTList: FC<Props> = ({ items, isMine }) => {
  const { buyItem } = useMarketContext()
  const { etherSymbol } = useWeb3()

  return (
    <div>
      <Grid.Container gap={2}>
        {items.map((item) => (
          <Grid xs={8}>
            <Card hoverable={false} shadow width="100%">
              <Image src={item.image} height="200px" width="400px" draggable={false} />
              <Text h4 mb={0}>
                {item.name}
              </Text>

              <Description title="Description" content={item.description} />
              <Description title="Owner" content={formatAddressToShort(item.owner)} />
              <Description title="Seller" content={formatAddressToShort(item.seller)} />
              {!isMine && (
                <Card.Footer>
                  <Button type="success" onClick={() => buyItem(item)}>
                    Buy for {formatBigNumber(item.price)} {etherSymbol}
                  </Button>
                </Card.Footer>
              )}
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={5} />
    </div>
  )
}

export default NFTList
