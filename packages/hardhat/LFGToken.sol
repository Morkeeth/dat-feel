// SPDX-License-Identifier: MIT
pragma solidity 0.5.12;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract LFGToken is ERC20 {
  constructor() ERC20('LFG Token', 'LFG') {}
}
