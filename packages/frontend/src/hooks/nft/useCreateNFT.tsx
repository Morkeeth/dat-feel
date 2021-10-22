import { useToasts } from '@geist-ui/react'
import { ethers } from 'ethers'
import { useState } from 'react'
import { NFTMarket__factory, NFT__factory } from '../../generated/types/index'
import { ipfsClient } from '../../utils/ipfs'
import useAddress from '../../web3/useAddress'
import useWeb3 from '../../web3/useWeb3'
import useListingPrice from './useListingPrice'

type Status = 'default' | 'loading' | 'error' | 'success'

type CreatePayload = {
  name: string
  description: string
  image: string
  price: string
}

const useCreateNFT = () => {
  const [toasts, setToast] = useToasts()
  const listingPrice = useListingPrice()
  const { signer } = useWeb3()
  const [status, setStatus] = useState<Status>('default')
  const nftAddress = useAddress('NFT')
  const nftMarketAddress = useAddress('NFTMarket')

  const create = async (payload: CreatePayload) => {
    try {
      setStatus('loading')
      const { price, ...rest } = payload
      const data = JSON.stringify(rest)
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      const nftContract = NFT__factory.connect(nftAddress, signer)
      let transaction = await nftContract.createToken(url)
      let tx = await transaction.wait()
      let event = tx?.events && tx.events[0]
      let tokenId = event?.args && event.args[2].toNumber()

      const nftMarketContract = NFTMarket__factory.connect(nftMarketAddress, signer)
      const priceParsed = ethers.utils.parseUnits(price, 'ether')

      transaction = await nftMarketContract.createMarketItem(
        nftContract.address,
        tokenId,
        priceParsed,
        {
          value: listingPrice.data,
        }
      )
      const result = await transaction.wait()
      console.log('result:', result)
      setStatus('success')
    } catch (error: unknown) {
      setToast({
        type: 'error',
        text: (error as Error).message,
      })
      setStatus('error')
      console.error('Error uploading file: ', error)
    }
  }

  return {
    create,
    status,
  }
}

export default useCreateNFT
