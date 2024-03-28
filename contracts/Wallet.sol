// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Wallet {
  event Deposited(address indexed user, uint256 amount);
  event Withdrawn(address indexed user, uint256 amount);

  IERC20 internal ThrusterLP;

  // Thruster LP token balances
  mapping(address => uint256) public balances;

  // users that deposited ThrusterLP tokens into their balances
  address[] internal usersArray;
  mapping(address => bool) internal users;

  constructor(address _ThrusterLPTokenAddress) {
    ThrusterLP = IERC20(_ThrusterLPTokenAddress);
  }

  function getBalance() external view returns (uint256) {
    return balances[msg.sender];
  }

  function deposit(uint256 amount) public {
    require(amount > 0, "Deposit amount should not be 0");
    require(
      ThrusterLP.allowance(msg.sender, address(this)) >= amount,
      "Insufficient allowance"
    );

    balances[msg.sender] = balances[msg.sender] + amount;

    // remember addresses that deposited tokens
    if (!users[msg.sender]) {
      users[msg.sender] = true;
      usersArray.push(msg.sender);
    }

    ThrusterLP.transferFrom(msg.sender, address(this), amount);

    emit Deposited(msg.sender, amount);
  }

  function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient token balance");

    balances[msg.sender] = balances[msg.sender] - amount;
    ThrusterLP.transfer(msg.sender, amount);

    emit Withdrawn(msg.sender, amount);
  }
}
