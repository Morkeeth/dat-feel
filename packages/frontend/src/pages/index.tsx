import type { NextPage } from 'next'
import SEO from '../components/SEO'
import WalletConnectButton from '../components/WalletConnectButton'
import { formatBigNumber } from '../utils/formatters'
import Button from '../components/Button'
import { Divider, Grid, Input, Spacer, Spinner, Textarea, Text } from '@geist-ui/react'
import useListingPrice from '../hooks/nft/useListingPrice'
import useWeb3 from '../web3/useWeb3'
import { ipfsClient } from '../utils/ipfs'
import React, { useState } from 'react'
import useCreateNFT from '../hooks/nft/useCreateNFT'
import MyNFTs from '../components/nft/MyNFTs'
import AvailableNFTs from '../components/nft/AvailableNFTs'

const CreateForm = () => {
  const { etherSymbol } = useWeb3()
  const listingPrice = useListingPrice()
  const [fileUrl, setFileUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  })
  const { create, status } = useCreateNFT()
  const validArguments = Boolean(
    formInput.name && formInput.description && formInput.price && fileUrl
  )
  async function onChange(e: any) {
    const file = e.target.files[0]
    try {
      setIsUploading(true)
      const added = await ipfsClient.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)

      console.log(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    } finally {
      setIsUploading(false)
    }
  }

  async function createMarket() {
    if (!validArguments) return
    const { name, description, price } = formInput

    create({
      name,
      description,
      image: fileUrl,
      price,
    })
  }

  if (!listingPrice.data) {
    return <Spinner />
  }

  return (
    <div>
      <Divider />
      <Spacer h={2} />
      <Text h1>Create NFT</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createMarket()
        }}
      >
        <Grid.Container gap={4}>
          <Grid>
            <Input
              placeholder="Name"
              value={formInput.name}
              onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
            />
          </Grid>
          <Grid>
            <Input
              labelRight="ETH"
              placeholder="Price"
              value={formInput.price}
              onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
            />
          </Grid>
          <Grid xs={12}>
            <Textarea
              placeholder="Description"
              value={formInput.description}
              onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            />
          </Grid>

          <Grid xs={12}>
            {isUploading ? <Spinner /> : <input type="file" name="Asset" onChange={onChange} />}
          </Grid>
          <Grid xs={24}>
            <Button
              disabled={!validArguments}
              loading={status === 'loading'}
              htmlType="submit"
              type="secondary"
            >
              Submit
            </Button>
          </Grid>
          {fileUrl && !isUploading && (
            <Grid xs={12}>
              <img className="rounded mt-4" width="150" src={fileUrl} />
            </Grid>
          )}
        </Grid.Container>
        <Spacer h={2} />
        <Divider>
          Listing price: {listingPrice && formatBigNumber(listingPrice.data)} {etherSymbol}
        </Divider>
      </form>
      <Spacer h={2} />
    </div>
  )
}

const Page: NextPage = () => {
  return (
    <>
      <SEO title="Create" />
      <div>
        <WalletConnectButton>
          <CreateForm />
          <Divider />
          <MyNFTs />
          <AvailableNFTs />
        </WalletConnectButton>
      </div>
    </>
  )
}

export default Page
