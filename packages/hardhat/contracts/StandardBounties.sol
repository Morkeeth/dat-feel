// SPDX-License-Identifier: UNLICENSED;
pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import './inherited/ERC20Token.sol';
import './inherited/ERC721Basic.sol';
import 'hardhat/console.sol';

// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title StandardBounties
/// @dev A contract for issuing bounties on Ethereum paying in ETH, ERC20, or ERC721 tokens
/// @author Mark Beylin <mark.beylin@consensys.net>, Gonçalo Sá <goncalo.sa@consensys.net>, Kevin Owocki <kevin.owocki@consensys.net>, Ricardo Guilherme Schmidt (@3esmit), Matt Garnett <matt.garnett@consensys.net>, Craig Williams <craig.williams@consensys.net>
contract StandardBounties {
  using SafeMath for uint256;

  /*
   * Structs
   */

  struct Bounty {
    address payable[] issuers; // An array of individuals who have complete control over the bounty, and can edit any of its parameters
    address[] approvers; // An array of individuals who are allowed to accept the fulfillments for a particular bounty
    uint256 deadline; // The Unix timestamp before which all submissions must be made, and after which refunds may be processed
    address token; // The address of the token associated with the bounty (should be disregarded if the tokenVersion is 0)
    uint256 tokenVersion; // The version of the token being used for the bounty (0 for ETH, 20 for ERC20, 721 for ERC721)
    uint256 balance; // The number of tokens which the bounty is able to pay out or refund
    bool hasPaidOut; // A boolean storing whether or not the bounty has paid out at least once, meaning refunds are no longer allowed
    Fulfillment[] fulfillments; // An array of Fulfillments which store the various submissions which have been made to the bounty
    Contribution[] contributions; // An array of Contributions which store the contributions which have been made to the bounty
  }

  struct Fulfillment {
    address payable[] fulfillers; // An array of addresses who should receive payouts for a given submission
    address submitter; // The address of the individual who submitted the fulfillment, who is able to update the submission as needed
  }

  struct Contribution {
    User contributor; // The address of the individual who contributed
    uint256 amount; // The amount of tokens the user contributed
    bool refunded; // A boolean storing whether or not the contribution has been refunded yet
  }

  struct User {
    address payable user_address; // The address of the individual who contributed
    uint256 xp; // The experience points earned
    bool isValid; // Helper property to know if the user exists on the map
  }

  /*
   * Storage
   */

  uint256 public numBounties; // An integer storing the total number of bounties in the contract
  mapping(uint256 => Bounty) public bounties; // A mapping of bountyIDs to bounties
  mapping(uint256 => mapping(uint256 => bool)) public tokenBalances; // A mapping of bountyIds to tokenIds to booleans, storing whether a given bounty has a given ERC721 token in its balance

  address public owner; // The address of the individual who's allowed to set the metaTxRelayer address
  address public metaTxRelayer; // The address of the meta transaction relayer whose _sender is automatically trusted for all contract calls

  bool public callStarted; // Ensures mutex for the entire contract

  mapping(address => User) public users; // A mapping of userAddresses

  User[10] public ranking;

  /*
   * Modifiers
   */

  modifier callNotStarted() {
    require(!callStarted);
    callStarted = true;
    _;
    callStarted = false;
  }

  modifier validateBountyArrayIndex(uint256 _index) {
    require(_index < numBounties);
    _;
  }

  modifier validateContributionArrayIndex(uint256 _bountyId, uint256 _index) {
    require(_index < bounties[_bountyId].contributions.length);
    _;
  }

  modifier validateFulfillmentArrayIndex(uint256 _bountyId, uint256 _index) {
    require(_index < bounties[_bountyId].fulfillments.length);
    _;
  }

  modifier validateIssuerArrayIndex(uint256 _bountyId, uint256 _index) {
    require(_index < bounties[_bountyId].issuers.length);
    _;
  }

  modifier validateApproverArrayIndex(uint256 _bountyId, uint256 _index) {
    require(_index < bounties[_bountyId].approvers.length);
    _;
  }

  modifier onlyIssuer(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId
  ) {
    require(_sender == bounties[_bountyId].issuers[_issuerId]);
    _;
  }

  modifier onlySubmitter(
    address _sender,
    uint256 _bountyId,
    uint256 _fulfillmentId
  ) {
    require(_sender == bounties[_bountyId].fulfillments[_fulfillmentId].submitter);
    _;
  }

  modifier onlyContributor(
    address _sender,
    uint256 _bountyId,
    uint256 _contributionId
  ) {
    require(_sender == bounties[_bountyId].contributions[_contributionId].contributor.user_address);
    _;
  }

  modifier isApprover(
    address _sender,
    uint256 _bountyId,
    uint256 _approverId
  ) {
    require(_sender == bounties[_bountyId].approvers[_approverId]);
    _;
  }

  modifier hasNotPaid(uint256 _bountyId) {
    require(!bounties[_bountyId].hasPaidOut);
    _;
  }

  modifier hasNotRefunded(uint256 _bountyId, uint256 _contributionId) {
    require(!bounties[_bountyId].contributions[_contributionId].refunded);
    _;
  }

  modifier senderIsValid(address _sender) {
    require(msg.sender == _sender || msg.sender == metaTxRelayer, 'Invalid sender');
    _;
  }

  /*
   * Public functions
   */

  constructor() public {
    // The owner of the contract is automatically designated to be the deployer of the contract
    owner = msg.sender;
  }

  /// @dev setMetaTxRelayer(): Sets the address of the meta transaction relayer
  /// @param _relayer the address of the relayer
  function setMetaTxRelayer(address _relayer) external {
    require(msg.sender == owner); // Checks that only the owner can call
    require(metaTxRelayer == address(0)); // Ensures the meta tx relayer can only be set once
    metaTxRelayer = _relayer;
  }

  /// @dev issueBounty(): creates a new bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _issuers the array of addresses who will be the issuers of the bounty
  /// @param _approvers the array of addresses who will be the approvers of the bounty
  /// @param _data the IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
  /// @param _deadline the timestamp which will become the deadline of the bounty
  /// @param _token the address of the token which will be used for the bounty
  /// @param _tokenVersion the version of the token being used for the bounty (0 for ETH, 20 for ERC20, 721 for ERC721)
  function issueBounty(
    address payable _sender,
    address payable[] memory _issuers,
    address[] memory _approvers,
    string memory _data,
    uint256 _deadline,
    address _token,
    uint256 _tokenVersion
  ) public senderIsValid(_sender) returns (uint256) {
    require(_tokenVersion == 0 || _tokenVersion == 20 || _tokenVersion == 721); // Ensures a bounty can only be issued with a valid token version
    require(_issuers.length > 0 || _approvers.length > 0); // Ensures there's at least 1 issuer or approver, so funds don't get stuck

    uint256 bountyId = numBounties; // The next bounty's index will always equal the number of existing bounties

    Bounty storage newBounty = bounties[bountyId];
    newBounty.issuers = _issuers;
    newBounty.approvers = _approvers;
    newBounty.deadline = _deadline;
    newBounty.tokenVersion = _tokenVersion;

    if (_tokenVersion != 0) {
      newBounty.token = _token;
    }

    numBounties = numBounties.add(1); // Increments the number of bounties, since a new one has just been added

    emit BountyIssued(
      bountyId,
      _sender,
      _issuers,
      _approvers,
      _data, // Instead of storing the string on-chain, it is emitted within the event for easy off-chain consumption
      _deadline,
      _token,
      _tokenVersion
    );

    return (bountyId);
  }

  /// @param _depositAmount the amount of tokens being deposited to the bounty, which will create a new contribution to the bounty

  function issueAndContribute(
    address payable _sender,
    address payable[] memory _issuers,
    address[] memory _approvers,
    string memory _data,
    uint256 _deadline,
    address _token,
    uint256 _tokenVersion,
    uint256 _depositAmount
  ) public payable returns (uint256) {
    uint256 bountyId = issueBounty(
      _sender,
      _issuers,
      _approvers,
      _data,
      _deadline,
      _token,
      _tokenVersion
    );

    contribute(_sender, bountyId, _depositAmount);

    return (bountyId);
  }

  /// @dev contribute(): Allows users to contribute tokens to a given bounty.
  ///                    Contributing merits no privelages to administer the
  ///                    funds in the bounty or accept submissions. Contributions
  ///                    are refundable but only on the condition that the deadline
  ///                    has elapsed, and the bounty has not yet paid out any funds.
  ///                    All funds deposited in a bounty are at the mercy of a
  ///                    bounty's issuers and approvers, so please be careful!
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _amount the amount of tokens being contributed
  function contribute(
    address payable _sender,
    uint256 _bountyId,
    uint256 _amount
  ) public payable senderIsValid(_sender) validateBountyArrayIndex(_bountyId) callNotStarted {
    require(_amount > 0); // Contributions of 0 tokens or token ID 0 should fail

    User storage contributor = users[_sender];

    // If user deesn't exist, then register it
    if (!users[_sender].isValid) {
      users[_sender] = User(_sender, 0, true); // Initial xp value of the user will be 0
      contributor = users[_sender];
      emit UserAdded(_sender, 0);
    }

    bounties[_bountyId].contributions.push(Contribution(contributor, _amount, false)); // Adds the contribution to the bounty

    if (bounties[_bountyId].tokenVersion == 0) {
      bounties[_bountyId].balance = bounties[_bountyId].balance.add(_amount); // Increments the balance of the bounty

      require(msg.value == _amount);
    } else if (bounties[_bountyId].tokenVersion == 20) {
      bounties[_bountyId].balance = bounties[_bountyId].balance.add(_amount); // Increments the balance of the bounty

      require(msg.value == 0); // Ensures users don't accidentally send ETH alongside a token contribution, locking up funds
      require(ERC20Token(bounties[_bountyId].token).transferFrom(_sender, address(this), _amount));
    } else if (bounties[_bountyId].tokenVersion == 721) {
      tokenBalances[_bountyId][_amount] = true; // Adds the 721 token to the balance of the bounty

      require(msg.value == 0); // Ensures users don't accidentally send ETH alongside a token contribution, locking up funds
      ERC721BasicToken(bounties[_bountyId].token).transferFrom(_sender, address(this), _amount);
    } else {
      revert();
    }

    emit ContributionAdded(
      _bountyId,
      bounties[_bountyId].contributions.length - 1, // The new contributionId
      _sender,
      _amount
    );
  }

  /// @dev refundContribution(): Allows users to refund the contributions they've
  ///                            made to a particular bounty, but only if the bounty
  ///                            has not yet paid out, and the deadline has elapsed.
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _contributionId the index of the contribution being refunded
  function refundContribution(
    address _sender,
    uint256 _bountyId,
    uint256 _contributionId
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateContributionArrayIndex(_bountyId, _contributionId)
    onlyContributor(_sender, _bountyId, _contributionId)
    hasNotPaid(_bountyId)
    hasNotRefunded(_bountyId, _contributionId)
    callNotStarted
  {
    require(now > bounties[_bountyId].deadline); // Refunds may only be processed after the deadline has elapsed

    Contribution storage contribution = bounties[_bountyId].contributions[_contributionId];

    contribution.refunded = true;

    transferTokens(_bountyId, contribution.contributor.user_address, contribution.amount); // Performs the disbursal of tokens to the contributor

    emit ContributionRefunded(_bountyId, _contributionId);
  }

  /// @dev refundMyContributions(): Allows users to refund their contributions in bulk
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _contributionIds the array of indexes of the contributions being refunded
  function refundMyContributions(
    address _sender,
    uint256 _bountyId,
    uint256[] memory _contributionIds
  ) public senderIsValid(_sender) {
    for (uint256 i = 0; i < _contributionIds.length; i++) {
      refundContribution(_sender, _bountyId, _contributionIds[i]);
    }
  }

  /// @dev refundContributions(): Allows users to refund their contributions in bulk
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is making the call
  /// @param _contributionIds the array of indexes of the contributions being refunded
  function refundContributions(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256[] memory _contributionIds
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    onlyIssuer(_sender, _bountyId, _issuerId)
    callNotStarted
  {
    for (uint256 i = 0; i < _contributionIds.length; i++) {
      require(_contributionIds[i] < bounties[_bountyId].contributions.length);

      Contribution storage contribution = bounties[_bountyId].contributions[_contributionIds[i]];

      require(!contribution.refunded);

      contribution.refunded = true;

      transferTokens(_bountyId, contribution.contributor.user_address, contribution.amount); // Performs the disbursal of tokens to the contributor
    }

    emit ContributionsRefunded(_bountyId, _sender, _contributionIds);
  }

  /// @dev drainBounty(): Allows an issuer to drain the funds from the bounty
  /// @notice when using this function, if an issuer doesn't drain the entire balance, some users may be able to refund their contributions, while others may not (which is unfair to them). Please use it wisely, only when necessary
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is making the call
  /// @param _amounts an array of amounts of tokens to be sent. The length of the array should be 1 if the bounty is in ETH or ERC20 tokens. If it's an ERC721 bounty, the array should be the list of tokenIDs.
  function drainBounty(
    address payable _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256[] memory _amounts
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    onlyIssuer(_sender, _bountyId, _issuerId)
    callNotStarted
  {
    if (bounties[_bountyId].tokenVersion == 0 || bounties[_bountyId].tokenVersion == 20) {
      require(_amounts.length == 1); // ensures there's only 1 amount of tokens to be returned
      require(_amounts[0] <= bounties[_bountyId].balance); // ensures an issuer doesn't try to drain the bounty of more tokens than their balance permits
      transferTokens(_bountyId, _sender, _amounts[0]); // Performs the draining of tokens to the issuer
    } else {
      for (uint256 i = 0; i < _amounts.length; i++) {
        require(tokenBalances[_bountyId][_amounts[i]]); // ensures an issuer doesn't try to drain the bounty of a token it doesn't have in its balance
        transferTokens(_bountyId, _sender, _amounts[i]);
      }
    }

    emit BountyDrained(_bountyId, _sender, _amounts);
  }

  /// @dev performAction(): Allows users to perform any generalized action
  ///                       associated with a particular bounty, such as applying for it
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _data the IPFS hash corresponding to a JSON object which contains the details of the action being performed (see docs for schema details)
  function performAction(
    address _sender,
    uint256 _bountyId,
    string memory _data
  ) public senderIsValid(_sender) validateBountyArrayIndex(_bountyId) {
    emit ActionPerformed(_bountyId, _sender, _data); // The _data string is emitted in an event for easy off-chain consumption
  }

  /// @dev fulfillBounty(): Allows users to fulfill the bounty to get paid out
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _fulfillers the array of addresses which will receive payouts for the submission
  /// @param _data the IPFS hash corresponding to a JSON object which contains the details of the submission (see docs for schema details)
  function fulfillBounty(
    address _sender,
    uint256 _bountyId,
    address payable[] memory _fulfillers,
    string memory _data
  ) public senderIsValid(_sender) validateBountyArrayIndex(_bountyId) {
    require(now < bounties[_bountyId].deadline); // Submissions are only allowed to be made before the deadline
    require(_fulfillers.length > 0); // Submissions with no fulfillers would mean no one gets paid out

    User storage contributor = users[_fulfillers[0]];

    // If user deesn't exist, then register it
    if (!users[_fulfillers[0]].isValid) {
      users[_fulfillers[0]] = User(_fulfillers[0], 0, true); // Initial xp value of the user will be 0
      contributor = users[_fulfillers[0]];
      emit UserAdded(_fulfillers[0], 0);
    }

    bounties[_bountyId].fulfillments.push(Fulfillment(_fulfillers, _sender));

    emit BountyFulfilled(
      _bountyId,
      (bounties[_bountyId].fulfillments.length - 1),
      _fulfillers,
      _data, // The _data string is emitted in an event for easy off-chain consumption
      _sender
    );
  }

  /// @dev updateFulfillment(): Allows the submitter of a fulfillment to update their submission
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _fulfillmentId the index of the fulfillment
  /// @param _fulfillers the new array of addresses which will receive payouts for the submission
  /// @param _data the new IPFS hash corresponding to a JSON object which contains the details of the submission (see docs for schema details)
  function updateFulfillment(
    address _sender,
    uint256 _bountyId,
    uint256 _fulfillmentId,
    address payable[] memory _fulfillers,
    string memory _data
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateFulfillmentArrayIndex(_bountyId, _fulfillmentId)
    onlySubmitter(_sender, _bountyId, _fulfillmentId) // Only the original submitter of a fulfillment may update their submission
  {
    bounties[_bountyId].fulfillments[_fulfillmentId].fulfillers = _fulfillers;
    emit FulfillmentUpdated(_bountyId, _fulfillmentId, _fulfillers, _data); // The _data string is emitted in an event for easy off-chain consumption
  }

  /// @dev acceptFulfillment(): Allows any of the approvers to accept a given submission
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _fulfillmentId the index of the fulfillment to be accepted
  /// @param _approverId the index of the approver which is making the call
  /// @param _tokenAmounts the array of token amounts which will be paid to the
  ///                      fulfillers, whose length should equal the length of the
  ///                      _fulfillers array of the submission. If the bounty pays
  ///                      in ERC721 tokens, then these should be the token IDs
  ///                      being sent to each of the individual fulfillers
  function acceptFulfillment(
    address _sender,
    uint256 _bountyId,
    uint256 _fulfillmentId,
    uint256 _approverId,
    uint256[] memory _tokenAmounts
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateFulfillmentArrayIndex(_bountyId, _fulfillmentId)
    isApprover(_sender, _bountyId, _approverId)
    callNotStarted
  {
    // now that the bounty has paid out at least once, refunds are no longer possible
    bounties[_bountyId].hasPaidOut = true;

    Fulfillment storage fulfillment = bounties[_bountyId].fulfillments[_fulfillmentId];

    require(_tokenAmounts.length == fulfillment.fulfillers.length); // Each fulfiller should get paid some amount of tokens (this can be 0)

    for (uint256 i = 0; i < fulfillment.fulfillers.length; i++) {
      if (_tokenAmounts[i] > 0) {
        // for each fulfiller associated with the submission
        transferTokens(_bountyId, fulfillment.fulfillers[i], _tokenAmounts[i]);
        // increase the xp. Amount * 10
        users[fulfillment.fulfillers[i]].xp = users[fulfillment.fulfillers[i]].xp.add(
          _tokenAmounts[i] * 10
        );
        // update the ranking
        elaborateTopTen(fulfillment.fulfillers[i], users[fulfillment.fulfillers[i]].xp);
      }
    }
    emit FulfillmentAccepted(_bountyId, _fulfillmentId, _sender, _tokenAmounts);
  }

  /// @dev fulfillAndAccept(): Allows any of the approvers to fulfill and accept a submission simultaneously
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _fulfillers the array of addresses which will receive payouts for the submission
  /// @param _data the IPFS hash corresponding to a JSON object which contains the details of the submission (see docs for schema details)
  /// @param _approverId the index of the approver which is making the call
  /// @param _tokenAmounts the array of token amounts which will be paid to the
  ///                      fulfillers, whose length should equal the length of the
  ///                      _fulfillers array of the submission. If the bounty pays
  ///                      in ERC721 tokens, then these should be the token IDs
  ///                      being sent to each of the individual fulfillers
  function fulfillAndAccept(
    address _sender,
    uint256 _bountyId,
    address payable[] memory _fulfillers,
    string memory _data,
    uint256 _approverId,
    uint256[] memory _tokenAmounts
  ) public senderIsValid(_sender) {
    // first fulfills the bounty on behalf of the fulfillers
    fulfillBounty(_sender, _bountyId, _fulfillers, _data);

    // then accepts the fulfillment
    acceptFulfillment(
      _sender,
      _bountyId,
      bounties[_bountyId].fulfillments.length - 1,
      _approverId,
      _tokenAmounts
    );
  }

  /// @dev changeBounty(): Allows any of the issuers to change the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _issuers the new array of addresses who will be the issuers of the bounty
  /// @param _approvers the new array of addresses who will be the approvers of the bounty
  /// @param _data the new IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
  /// @param _deadline the new timestamp which will become the deadline of the bounty
  function changeBounty(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    address payable[] memory _issuers,
    address payable[] memory _approvers,
    string memory _data,
    uint256 _deadline
  ) public senderIsValid(_sender) {
    require(_bountyId < numBounties); // makes the validateBountyArrayIndex modifier in-line to avoid stack too deep errors
    require(_issuerId < bounties[_bountyId].issuers.length); // makes the validateIssuerArrayIndex modifier in-line to avoid stack too deep errors
    require(_sender == bounties[_bountyId].issuers[_issuerId]); // makes the onlyIssuer modifier in-line to avoid stack too deep errors

    require(_issuers.length > 0 || _approvers.length > 0); // Ensures there's at least 1 issuer or approver, so funds don't get stuck

    bounties[_bountyId].issuers = _issuers;
    bounties[_bountyId].approvers = _approvers;
    bounties[_bountyId].deadline = _deadline;
    emit BountyChanged(_bountyId, _sender, _issuers, _approvers, _data, _deadline);
  }

  /// @dev changeIssuer(): Allows any of the issuers to change a particular issuer of the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _issuerIdToChange the index of the issuer who is being changed
  /// @param _newIssuer the address of the new issuer
  function changeIssuer(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256 _issuerIdToChange,
    address payable _newIssuer
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateIssuerArrayIndex(_bountyId, _issuerIdToChange)
    onlyIssuer(_sender, _bountyId, _issuerId)
  {
    require(_issuerId < bounties[_bountyId].issuers.length || _issuerId == 0);

    bounties[_bountyId].issuers[_issuerIdToChange] = _newIssuer;

    emit BountyIssuersUpdated(_bountyId, _sender, bounties[_bountyId].issuers);
  }

  /// @dev changeApprover(): Allows any of the issuers to change a particular approver of the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _approverId the index of the approver who is being changed
  /// @param _approver the address of the new approver
  function changeApprover(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256 _approverId,
    address payable _approver
  )
    external
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    onlyIssuer(_sender, _bountyId, _issuerId)
    validateApproverArrayIndex(_bountyId, _approverId)
  {
    bounties[_bountyId].approvers[_approverId] = _approver;

    emit BountyApproversUpdated(_bountyId, _sender, bounties[_bountyId].approvers);
  }

  /// @dev changeIssuerAndApprover(): Allows any of the issuers to change a particular approver of the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _issuerIdToChange the index of the issuer who is being changed
  /// @param _approverIdToChange the index of the approver who is being changed
  /// @param _issuer the address of the new approver
  function changeIssuerAndApprover(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256 _issuerIdToChange,
    uint256 _approverIdToChange,
    address payable _issuer
  ) external senderIsValid(_sender) onlyIssuer(_sender, _bountyId, _issuerId) {
    require(_bountyId < numBounties);
    require(_approverIdToChange < bounties[_bountyId].approvers.length);
    require(_issuerIdToChange < bounties[_bountyId].issuers.length);

    bounties[_bountyId].issuers[_issuerIdToChange] = _issuer;
    bounties[_bountyId].approvers[_approverIdToChange] = _issuer;

    emit BountyIssuersUpdated(_bountyId, _sender, bounties[_bountyId].issuers);
    emit BountyApproversUpdated(_bountyId, _sender, bounties[_bountyId].approvers);
  }

  /// @dev changeData(): Allows any of the issuers to change the data the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _data the new IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
  function changeData(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    string memory _data
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateIssuerArrayIndex(_bountyId, _issuerId)
    onlyIssuer(_sender, _bountyId, _issuerId)
  {
    emit BountyDataChanged(_bountyId, _sender, _data); // The new _data is emitted within an event rather than being stored on-chain for minimized gas costs
  }

  /// @dev changeDeadline(): Allows any of the issuers to change the deadline the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _deadline the new timestamp which will become the deadline of the bounty
  function changeDeadline(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    uint256 _deadline
  )
    external
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateIssuerArrayIndex(_bountyId, _issuerId)
    onlyIssuer(_sender, _bountyId, _issuerId)
  {
    bounties[_bountyId].deadline = _deadline;

    emit BountyDeadlineChanged(_bountyId, _sender, _deadline);
  }

  /// @dev addIssuers(): Allows any of the issuers to add more issuers to the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _issuers the array of addresses to add to the list of valid issuers
  function addIssuers(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    address payable[] memory _issuers
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateIssuerArrayIndex(_bountyId, _issuerId)
    onlyIssuer(_sender, _bountyId, _issuerId)
  {
    for (uint256 i = 0; i < _issuers.length; i++) {
      bounties[_bountyId].issuers.push(_issuers[i]);
    }

    emit BountyIssuersUpdated(_bountyId, _sender, bounties[_bountyId].issuers);
  }

  /// @dev addApprovers(): Allows any of the issuers to add more approvers to the bounty
  /// @param _sender the sender of the transaction issuing the bounty (should be the same as msg.sender unless the txn is called by the meta tx relayer)
  /// @param _bountyId the index of the bounty
  /// @param _issuerId the index of the issuer who is calling the function
  /// @param _approvers the array of addresses to add to the list of valid approvers
  function addApprovers(
    address _sender,
    uint256 _bountyId,
    uint256 _issuerId,
    address[] memory _approvers
  )
    public
    senderIsValid(_sender)
    validateBountyArrayIndex(_bountyId)
    validateIssuerArrayIndex(_bountyId, _issuerId)
    onlyIssuer(_sender, _bountyId, _issuerId)
  {
    for (uint256 i = 0; i < _approvers.length; i++) {
      bounties[_bountyId].approvers.push(_approvers[i]);
    }

    emit BountyApproversUpdated(_bountyId, _sender, bounties[_bountyId].approvers);
  }

  /// @dev getBounty(): Returns the details of the bounty
  /// @param _bountyId the index of the bounty
  /// @return Returns a tuple for the bounty
  function getBounty(uint256 _bountyId) external view returns (Bounty memory) {
    return bounties[_bountyId];
  }

  // @dev getUser(): Returns the details of a user
  /// @param _userAddress the user address
  /// @return Returns a tuple for the User
  function getUser(address _userAddress) external view returns (User memory) {
    return users[_userAddress];
  }

  function transferTokens(
    uint256 _bountyId,
    address payable _to,
    uint256 _amount
  ) internal {
    if (bounties[_bountyId].tokenVersion == 0) {
      require(_amount > 0); // Sending 0 tokens should throw
      require(bounties[_bountyId].balance >= _amount);

      bounties[_bountyId].balance = bounties[_bountyId].balance.sub(_amount);

      _to.transfer(_amount);
    } else if (bounties[_bountyId].tokenVersion == 20) {
      require(_amount > 0); // Sending 0 tokens should throw
      require(bounties[_bountyId].balance >= _amount);

      bounties[_bountyId].balance = bounties[_bountyId].balance.sub(_amount);

      require(ERC20Token(bounties[_bountyId].token).transfer(_to, _amount));
    } else if (bounties[_bountyId].tokenVersion == 721) {
      require(tokenBalances[_bountyId][_amount]);

      tokenBalances[_bountyId][_amount] = false; // Removes the 721 token from the balance of the bounty

      ERC721BasicToken(bounties[_bountyId].token).transferFrom(address(this), _to, _amount);
    } else {
      revert();
    }
  }

  /*
   * Private functions
   */

  function elaborateTopTen(address payable user_address, uint256 xp) private {
    uint256 i = 0;
    /** get the index of the current max element **/
    for (i; i < ranking.length; i++) {
      if (ranking[i].xp < xp) {
        break;
      }
    }
    /** shift the array of position (getting rid of the last element) **/
    for (uint256 j = ranking.length - 1; j > i; j--) {
      ranking[j].xp = ranking[j - 1].xp;
      ranking[j].user_address = ranking[j - 1].user_address;
    }
    /** update the new max element **/
    ranking[i].xp = xp;
    ranking[i].user_address = user_address;
  }

  /*
   * Events
   */

  event UserAdded(address payable _userAddress, uint256 _xp);
  event BountyIssued(
    uint256 _bountyId,
    address payable _creator,
    address payable[] _issuers,
    address[] _approvers,
    string _data,
    uint256 _deadline,
    address _token,
    uint256 _tokenVersion
  );
  event ContributionAdded(
    uint256 _bountyId,
    uint256 _contributionId,
    address payable _contributor,
    uint256 _amount
  );
  event ContributionRefunded(uint256 _bountyId, uint256 _contributionId);
  event ContributionsRefunded(uint256 _bountyId, address _issuer, uint256[] _contributionIds);
  event BountyDrained(uint256 _bountyId, address _issuer, uint256[] _amounts);
  event ActionPerformed(uint256 _bountyId, address _fulfiller, string _data);
  event BountyFulfilled(
    uint256 _bountyId,
    uint256 _fulfillmentId,
    address payable[] _fulfillers,
    string _data,
    address _submitter
  );
  event FulfillmentUpdated(
    uint256 _bountyId,
    uint256 _fulfillmentId,
    address payable[] _fulfillers,
    string _data
  );
  event FulfillmentAccepted(
    uint256 _bountyId,
    uint256 _fulfillmentId,
    address _approver,
    uint256[] _tokenAmounts
  );
  event BountyChanged(
    uint256 _bountyId,
    address _changer,
    address payable[] _issuers,
    address payable[] _approvers,
    string _data,
    uint256 _deadline
  );
  event BountyIssuersUpdated(uint256 _bountyId, address _changer, address payable[] _issuers);
  event BountyApproversUpdated(uint256 _bountyId, address _changer, address[] _approvers);
  event BountyDataChanged(uint256 _bountyId, address _changer, string _data);
  event BountyDeadlineChanged(uint256 _bountyId, address _changer, uint256 _deadline);
}
