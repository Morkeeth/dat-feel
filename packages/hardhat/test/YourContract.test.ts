import { ethers } from 'hardhat'
import { use, expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { Contract } from '@ethersproject/contracts'

use(solidity)

describe('My Dapp', function () {
  let myContract: Contract

  describe('YourContract', function () {
    it.skip('Should deploy YourContract', async function () {
      const YourContract = await ethers.getContractFactory('YourContract')

      myContract = await YourContract.deploy()
    })

    describe('setPurpose()', function () {
      it.skip('Should be able to set a new purpose', async function () {
        const newPurpose = 'Test Purpose'

        await myContract.setPurpose(newPurpose)
        expect(await myContract.purpose()).to.equal(newPurpose)
      })
    })
  })
})
