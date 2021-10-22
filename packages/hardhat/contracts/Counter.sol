//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Counter {
  using Counters for Counters.Counter;
  Counters.Counter private _currentCount;

  function increase() public returns (uint256) {
    _currentCount.increment();
    uint256 current = _currentCount.current();

    return current;
  }

  function getCurrentCount() public view returns (uint256) {
    console.log('getCurrentCount');
    uint256 current = _currentCount.current();

    return current;
  }
}
