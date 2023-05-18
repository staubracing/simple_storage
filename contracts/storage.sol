// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RacerRegistry {
    struct Rider {
        string name;
        uint16 bikeNumber;
        address riderAddress;
    }

    Rider[] public ridersList;

    mapping(address => Rider) public riders;

    // Function to set the name of the rider
 function racerName(string memory _name, uint16 _bikeNumber, address _riderAddress) public {
    require(!nameExists(_name), "Name already exists");
    require(!bikeNumberExists(_bikeNumber, _riderAddress), "Bike number already exists"); // Check if bike number already exists in the list of riders 
    ridersList.push(Rider(_name, _bikeNumber, _riderAddress)); // Add rider to the list
    riders[_riderAddress] = Rider(_name, _bikeNumber, _riderAddress); // Add rider to the mapping
}

function nameExists(string memory _name) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (keccak256(bytes(ridersList[i].name)) == keccak256(bytes(_name))) {
            return true;
        }
    }
    return false;
}

function bikeNumberExists(uint16 _bikeNumber, address _riderAddress) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (ridersList[i].bikeNumber == _bikeNumber && ridersList[i].riderAddress != _riderAddress) {
            return true;
        }
    }
    return false;
}
}
