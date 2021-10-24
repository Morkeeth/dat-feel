export const organizations = [
  {
    owner:
      process.env.NODE_ENV === 'development'
        ? '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
        : '0xa50F556168a2A67EeABD5BAf821212a6F0c8Fe1E',
    url: 'compound',
    ipfs: 'https://ipfs.infura.io/ipfs/QmPvRfZrCs914VBtqfMYdAmuNp7CWXM9X87kGSTkWKgcno',
  },

  {
    owner:
      process.env.NODE_ENV === 'development'
        ? '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
        : '0xA4B7CEe8409673624EC9B075f5A4f9b8EbAdEd49',
    url: 'uniswap',
    ipfs: 'https://ipfs.infura.io/ipfs/QmVsjWvwGLtXpWyzcVyRnaQRKH2M3PbULQREw2fQmjSnLa',
  },
  {
    owner: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    url: 'mate',
    ipfs: 'https://ipfs.infura.io/ipfs/QmfYUJHuiFgbs7Y4QegtgMuBDZNH4Z4JmwCAngkadqnGyB',
  },
]
