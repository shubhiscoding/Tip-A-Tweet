// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tipping {
    mapping(string => uint256) public tips; // username -> accumulated tip amount
    address public owner;
    uint256 public constant MIN_TIP_AMOUNT = 0.001 ether;

    constructor() {
        owner = msg.sender;
    }

    function tip(string memory username) public payable {
        // Validate tip amount
        require(msg.value >= MIN_TIP_AMOUNT, "Tip amount must be greater than 0.001 ether");

        // Calculate platform fee (1%)
        uint256 platformFee = msg.value / 100;

        // Add tip amount to user balance
        tips[username] += msg.value - platformFee;

        // Transfer platform fee to contract owner
        payable(owner).transfer(platformFee);
    }

    function withdraw(string memory username) public {
        // Check if user has any accumulated tips
        uint256 userTips = tips[username];
        require(userTips > 0, "No tips available to withdraw");

        // Reset user's balance
        tips[username] = 0;

        // Transfer withdrawal amount to user's wallet address
        payable(msg.sender).transfer(userTips);
    }

    function ammountOfTip(string memory username) public view returns (uint256){
        return tips[username];
    }

}
// 0x6Bf6dc601F0eD1E688b5a49c48d75696057099F4