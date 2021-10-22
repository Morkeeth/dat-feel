import { Text } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { useMarketContext } from '../../contexts/MarketContext'
import NFTList from './NFTList'

const AvailableNFTs: FC = () => {
  const { items } = useMarketContext()

  return (
    <div>
      <Text h2>Listed NFTs</Text>
      <NFTList items={items} />
    </div>
  )
}

export default AvailableNFTs
