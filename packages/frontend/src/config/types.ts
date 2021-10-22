import { BigNumber } from 'ethers'
export type MarketMeta = {
  image: string
  name: string
  description: string
}

export type MarketItem = MarketMeta & {
  price: BigNumber
  tokenId: number
  seller: string
  owner: string
}
