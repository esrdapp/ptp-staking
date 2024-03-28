// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.6/contracts/token/ERC20/ERC20.sol";

contract TestingPulsechainScan is ERC20 {
    constructor() ERC20("Testing", "\u0394") {}

}