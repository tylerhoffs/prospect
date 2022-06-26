// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.13;

import {
    ISuperfluid,
    IInstantDistributionAgreementV1,
    IConstantFlowAgreementV1,
    StreamInDistributeOut,
    ISuperToken
} from "./StreamInDistributeOut.sol";
import {
    IInstantDistributionAgreementV1,
    IDAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

interface IMintable {
    function mint(address,uint256,bytes calldata) external;
}

contract StreamMintDistribute is StreamInDistributeOut {
    address private stakingContract;

    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        IInstantDistributionAgreementV1 ida,
        ISuperToken inToken,
        ISuperToken outToken,
        address staking
    ) StreamInDistributeOut(host, cfa, ida, inToken, outToken) {
        stakingContract = staking;
    }

    function _beforeDistribution() internal override returns (uint256 distributionAmount) {
        uint256 amountToMint = (block.timestamp - lastDistribution) * 10000e18/86400;
        IMintable(address(_outToken)).mint(address(this), amountToMint, "");
        _inToken.send(
            stakingContract,
            _inToken.balanceOf(address(this)),
            ""
        );
    }
}