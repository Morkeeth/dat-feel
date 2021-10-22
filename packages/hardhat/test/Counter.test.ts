import { ethers } from 'hardhat'
import { use, expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { Contract } from '@ethersproject/contracts'

use(solidity)

describe('My Dapp', function () {
  let myContract: Contract

  describe('Counter', function () {
    it('Should deploy Counter', async function () {
      const Counter = await ethers.getContractFactory('Counter')

      myContract = await Counter.deploy()
    })

    describe('increase()', function () {
      it('Should increase', async function () {
        expect(await myContract.getCurrentCount()).to.equal('0')
        await myContract.increase()
        expect(await myContract.getCurrentCount()).to.equal('1')
      })
    })
  })
})
