// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RacerRegistry {
    struct Rider {
        string name;
        uint256 bikeNumber;
    }

    Rider[] public riders;

    mapping(address => uint256) public racerriders;

    function racerName(string memory _name) public {
        riders[msg.sender].name = _name;
    }

    function racerBikeNumber(uint256 _bikeNumber) public {
        riders[msg.sender].bikeNumber = _bikeNumber;
    }

    function getRiderName() public view returns (string memory) {
        return riders[msg.sender].name; // 
    }

    function getBikeNumber() public view returns (uint256) {
        return riders[msg.sender].bikeNumber;
    }
}
