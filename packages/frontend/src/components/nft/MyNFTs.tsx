import * as React from 'react'
import { FC } from 'react'
import { useMarketContext } from '../../contexts/MarketContext'
import NFTList from './NFTList'
import { Text } from '@geist-ui/react'

const MyNFTs: FC = () => {
  const { myItems } = useMarketContext()

  return (
    <div>
      <Text h2>My NFTs</Text>
      <NFTList isMine items={myItems} />
    </div>
  )
}

export default MyNFTs
