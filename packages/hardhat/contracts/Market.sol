//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

import 'hardhat/console.sol';

contract Market is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _gigIds;
  Counters.Counter private _completedIds;
  Counters.Counter private _appliesIds;

  address payable owner;

  mapping(uint256 => Gig) public gigs;
  mapping(uint256 => Apply) private applies;

  enum Status {
    Open,
    Active,
    Approved
  }

  struct Gig {
    uint256 id;
    uint256 applyId;
    address creator;
    address assigne;
    uint256 duration;
    uint256 createdAt;
    uint256 maxPrice;
    uint256 minPrice;
    Status status;
  }

  struct Apply {
    uint256 id;
    address creator;
    uint256 gigId;
    uint256 createdAt;
  }

  constructor() {
    owner = payable(msg.sender);
  }

  function createGig(
    address nftContract,
    uint256 tokenId,
    uint256 _duration,
    uint256 _maxPrice,
    uint256 _minPrice
  ) public payable nonReentrant {
    _gigIds.increment();
    uint256 id = _gigIds.current();

    Gig storage gig = gigs[id];
    gig.id = id;
    gig.creator = msg.sender;
    gig.createdAt = block.timestamp;
    gig.status = Status.Open;
    gig.duration = _duration;
    gig.maxPrice = _maxPrice;
    gig.minPrice = _minPrice;
    gigs[id] = gig;

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    //     uint256 allowance = IERC20(ETH).allowance(
    //     msg.sender,
    //     address(this)
    // );
  }

  function getAllGigs() public view returns (Gig[] memory) {
    uint256 itemCount = _gigIds.current();
    uint256 activeGigCount = _gigIds.current() - _completedIds.current();
    uint256 currentIndex = 0;

    Gig[] memory items = new Gig[](activeGigCount);
    for (uint256 i = 0; i < itemCount; i++) {
      uint256 currentId = i + 1;
      Gig storage currentItem = gigs[currentId];
      items[currentIndex] = currentItem;
      currentIndex += 1;
    }

    return items;
  }

  function getGig(uint256 _gigId) public view returns (Gig memory) {
    Gig storage gig = gigs[_gigId];

    return gig;
  }

  function getApply(uint256 _applyId) public view returns (Apply memory) {
    Apply storage item = applies[_applyId];

    return item;
  }

  function getApplicationsForGig(uint256 _gigId) public view returns (Apply[] memory) {
    uint256 applyCount = _appliesIds.current();
    uint256 currentIndex = 0;
    uint256 itemCount = 0;

    for (uint256 i = 0; i < applyCount; i++) {
      if (applies[i + 1].gigId == _gigId) {
        itemCount += 1;
      }
    }

    Apply[] memory items = new Apply[](itemCount);

    for (uint256 i = 0; i < applyCount; i++) {
      uint256 currentId = i + 1;

      if (applies[currentId].gigId == _gigId) {
        Apply storage currentItem = applies[currentId];

        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }

  function applyForGig(uint256 _gigId) public {
    _appliesIds.increment();
    uint256 id = _appliesIds.current();

    Apply storage item = applies[id];
    item.id = id;
    item.creator = msg.sender;
    item.createdAt = block.timestamp;
    item.gigId = _gigId;
  }

  function _getGig(uint256 _gigId) private view returns (Gig storage) {
    bool gigExist = false;
    uint256 itemCount = _gigIds.current();

    for (uint256 i = 0; i < itemCount; i++) {
      if (gigs[i + 1].id == _gigId) {
        gigExist = true;
      }
    }

    require(gigExist, 'Gig does not exist');

    Gig storage gig = gigs[_gigId];

    return gig;
  }

  function assignGig(uint256 _gigId, uint256 _applyId) external {
    uint256 applyCount = _appliesIds.current();
    bool applicationExist = false;

    for (uint256 i = 0; i < applyCount; i++) {
      if (applies[i + 1].id == _applyId) {
        applicationExist = true;
      }
    }

    require(applicationExist, 'Application does not exist');

    for (uint256 i = 0; i < applyCount; i++) {
      if (applies[i + 1].id == _applyId) {
        applicationExist = true;
      }
    }

    Gig storage gig = _getGig(_gigId);
    require(gig.creator == msg.sender, 'Only the owner of the gig can assign');

    gig.status = Status.Active;
    gig.applyId = _applyId;
  }

  function approveWork(uint256 _gigId) external {
    Gig storage gig = _getGig(_gigId);
    require(gig.creator == msg.sender, 'Only the owner of the gig can approve');
    gig.status = Status.Approved;

    // Call returns a boolean value indicating success or failure.
    // This is the current recommended method to use.
    // (bool sent, bytes memory data) = _to.call{value: msg.value}('');
    // require(sent, 'Failed to send Ether');
  }
}
