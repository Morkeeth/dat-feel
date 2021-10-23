// import { ethers } from 'ethers'
// import { ethers } from 'ethers'
import { deployments, getUnnamedAccounts, ethers, getNamedAccounts } from 'hardhat'

const { expect } = require('chai')

describe('Standard Bounties', async () => {
  // @ts-ignore
  let StandardBounties: ethers.Contract
  let deployer: string
  let issuer: string
  let approver1: string
  let approver2: string

  beforeEach(async () => {
    await deployments.fixture(['StandardBounties'])
    deployer = (await getNamedAccounts()).deployer
    ;[issuer, approver1, approver2] = await getUnnamedAccounts()

    const standardBounties = await deployments.get('StandardBounties')
    StandardBounties = await ethers.getContractAt('StandardBounties', standardBounties.address)
  })

  it('[ETH] Verifies that I can issue a bounty paying in ETH while locking up funds', async () => {
    await StandardBounties.issueAndContribute(
      deployer,
      [issuer],
      [approver1, approver2],
      'data',
      2528821098,
      '0x0000000000000000000000000000000000000000',
      0,
      1,
      { value: 1 }
    )

    const total = await StandardBounties.numBounties()

    expect(parseInt(total, 10)).to.equal(1)

    const bounty = await StandardBounties.bounties(0)

    expect(parseInt(bounty.balance, 10)).to.equal(1)
  })
})
