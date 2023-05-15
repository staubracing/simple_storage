// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RacerRegistry {
    struct Rider {
        string name;
        uint16 bikeNumber;
    }

    mapping(address => Rider) public riders;

    function racerName(string memory _name) public {
        riders[msg.sender].name = _name;
    }

    function racerBikeNumber(uint16 _bikeNumber) public {
        riders[msg.sender].bikeNumber = _bikeNumber;
    }

    function getRiderName() public view returns (string memory) {
        return riders[msg.sender].name; // 
    }

    function getBikeNumber() public view returns (uint16) {
        return riders[msg.sender].bikeNumber;
    }
}
