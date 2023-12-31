// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EtherWallet {

    address public owner;
    // uint private balance;

    constructor() {
        owner = payable(msg.sender);
    }
    receive() external payable {}
    // executed on a call to the contract with empty calldata
    // This function cannot have an argument
    function deposit(uint256 amount) payable public {
    require(msg.value == amount);
    
    }

    
    function Withdraw(uint _amount) external {
        require(msg.sender == owner, "Only owner can call this function");
        // modifier(payable)

        payable(msg.sender).transfer(_amount);
        
    }

//     function GetBalance() external view returns(uint) {
//         return address(this).balance;
//     }
}



