//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title Token is a basic ERC20 Token
 */
contract Token is ERC20, Ownable {
  /**
   * @dev assign totalSupply to account creating this contract
   */
  constructor() ERC20('Dat Feel Token', 'DFT') {
    _mint(msg.sender, 1000000000000000000000000000);
  }
}
