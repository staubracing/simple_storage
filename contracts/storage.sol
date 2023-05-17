// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RacerRegistry {
    struct Rider {
        string name;
        uint256 bikeNumber;
    }

    Rider[] public ridersList;

    // mapping(address => Rider) public riders;

    // Function to set the name of the rider
    function racerName(string memory _name) public {
        ridersList.push(Rider(_name, 0)); // Add rider to the list
        
    }
}
