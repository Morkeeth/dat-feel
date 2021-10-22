import { create } from 'ipfs-http-client'

export const ipfsClient = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
})
