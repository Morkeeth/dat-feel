/* This context can be removed once all subpages are using the store directly instead of props */

import { useContractCalls } from '@usedapp/core'
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { MarketItem, MarketMeta } from '../config/types'
import { NFTMarket__factory, NFT__factory } from '../generated/types'
import useAddress from '../web3/useAddress'
import useCall from '../web3/useCall'
import useWeb3 from '../web3/useWeb3'

type MarketContextType = {
  items: MarketItem[]
  myItems: MarketItem[]
  buyItem: (nft: MarketItem) => Promise<void>
}

const MarketContext = createContext<MarketContextType>({} as MarketContextType)

export const MarketContextProvider: FC = ({ children }) => {
  const { signer, connected, account } = useWeb3()
  const [meta, setMeta] = useState<Record<string, MarketMeta>>({})
  const nftMarketAddress = useAddress('NFTMarket')
  const nftAddress = useAddress('NFT')
  const nftMarketItems = useCall<any[]>({
    abi: NFTMarket__factory.createInterface(),
    address: nftMarketAddress,
    method: 'fetchMarketItems',
  })

  const [myMarketItems, setMyMarketItems] = useState<any[]>([])

  const fetchMyItems = async () => {
    if (connected && signer) {
      const market = NFTMarket__factory.connect(nftMarketAddress, signer)
      const nfts = await market.fetchMyNFTs()
      setMyMarketItems(nfts)
    }
  }

  useEffect(() => {
    fetchMyItems()

    return () => {
      setMyMarketItems([])
    }
  }, [connected, account])

  const ids = [
    ...(myMarketItems?.map((item: any) => item.tokenId) || []),
    ...(nftMarketItems.data?.map((item: any) => item.tokenId) || []),
  ]
  const tokenURICalls =
    ids.map((id) => ({
      abi: NFT__factory.createInterface(),
      address: nftAddress,
      method: 'tokenURI',
      args: [id],
    })) || []

  const tokenURIs = useContractCalls(tokenURICalls) || []

  useEffect(() => {
    tokenURIs.map(async (tokenUri, i) => {
      if (tokenUri) {
        const tokenId = tokenURICalls[i].args[0].toString()
        const data = await (await fetch(tokenUri[0])).json()
        setMeta((prev) => ({ ...prev, [tokenId]: data }))
      }
    })
  }, [tokenURIs])

  const mapNftToMarket = (item: any): MarketItem => {
    const data = meta[item.tokenId.toString()]

    return {
      price: item.price,
      tokenId: item.tokenId.toNumber(),
      seller: item.seller,
      owner: item.owner,
      image: data?.image,
      name: data?.name,
      description: data?.description,
    }
  }

  const items = nftMarketItems.data?.map(mapNftToMarket) || []
  const myItems = myMarketItems.map(mapNftToMarket)
  const buyItem = async (nft: MarketItem) => {
    if (!signer) return

    const nftMarket = NFTMarket__factory.connect(nftMarketAddress, signer)
    const transaction = await nftMarket.createMarketSale(nftAddress, nft.tokenId, {
      value: nft.price,
    })
    await transaction.wait()
  }

  const value = {
    items,
    myItems,
    buyItem,
  }

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

export const MarketContextConsumer = MarketContext.Consumer

export const useMarketContext = (): MarketContextType => {
  const store = useContext(MarketContext)
  if (!store) {
    throw new Error('Missing MarketContext.Provider')
  }
  return store
}
