// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.13;

import {
    ISuperfluid,
    IInstantDistributionAgreementV1,
    IConstantFlowAgreementV1,
    StreamInDistributeOut,
    ISuperToken
} from "./StreamInDistributeOut.sol";
import "./ProspectStaking.sol";
import "./MintableSuperToken.sol";
import "./StreamMintDistribute.sol";

contract ProspectFactory {
  address private constant tokenFactory = 0x200657E2f123761662567A1744f9ACAe50dF47E6;
  ISuperfluid private host = ISuperfluid(0xEB796bdb90fFA0f28255275e16936D25d3418603);
  IConstantFlowAgreementV1 private cfa = IConstantFlowAgreementV1(
    0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873
  );
  IInstantDistributionAgreementV1 private ida = IInstantDistributionAgreementV1(
    0x804348D4960a61f2d5F9ce9103027A3E849E09b8
  );
  ISuperToken private fDAIx = ISuperToken(0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f);

  struct CreatorInfo {
    address loyaltyToken;
    address distributor;
    address staking;
    string ipfsLink;
  }
  mapping(address => CreatorInfo) public creatorInfo;

  function createProfile(
    string calldata name,
    string calldata symbol,
    string calldata ipfsLink
  ) external {
    require(creatorInfo[msg.sender].loyaltyToken == address(0));
    MintableSuperToken mintable = new MintableSuperToken();
    mintable.initialize(name, symbol, tokenFactory);
    ProspectStaking ps = new ProspectStaking(host, ida, fDAIx, ISuperToken(address(mintable)));
    StreamMintDistribute loyaltyTokenDistributor = new StreamMintDistribute(
      host,
      cfa,
      ida,
      fDAIx,
      ISuperToken(address(mintable)),
      address(ps)
    );
    mintable.transferOwnership(address(loyaltyTokenDistributor));
    creatorInfo[msg.sender] = CreatorInfo(
      address(mintable),
      address(loyaltyTokenDistributor),
      address(ps),
      ipfsLink
    );
  }
  
}