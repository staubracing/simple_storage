// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Storage contract
/// @author Staub
/// @notice A simple storage contract

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

    // Function to set the bike number of the rider
function racerBikeNumber(uint16 _bikeNumber, address _riderAddress) public {
    require(!bikeNumberExists(_bikeNumber, _riderAddress), "Bike number already exists"); // Check if bike number already exists in the list of riders 
    ridersList.push(Rider(riders[_riderAddress].name, _bikeNumber, _riderAddress)); // Add rider to the list
    riders[_riderAddress] = Rider(riders[_riderAddress].name, _bikeNumber, _riderAddress); // Add rider to the mapping
}

    // Function to check if the name already exists
function nameExists(string memory _name) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (keccak256(bytes(ridersList[i].name)) == keccak256(bytes(_name))) {
            return true;
        }
    }
    return false;
}

    // Function to check if the bike number already exists
function bikeNumberExists(uint16 _bikeNumber, address _riderAddress) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (ridersList[i].bikeNumber == _bikeNumber && ridersList[i].riderAddress != _riderAddress) {
            return true;
        }
    }
    return false;
}

    // Function to get the name of the rider
function getRiderName(address _riderAddress) public view returns (string memory) {
    return riders[_riderAddress].name;
}

    // Function to get the bike number of the rider
function getRiderBikeNumber(address _riderAddress) public view returns (uint16) {
    return riders[_riderAddress].bikeNumber;
}

    // Function to get a list of all riders by name
function getRiderNames() public view returns (string[] memory) {
    string[] memory names = new string[](ridersList.length);
    for (uint256 i = 0; i < ridersList.length; i++) {
        names[i] = ridersList[i].name;
    }
    return names;
}

    // Function to get the address of the rider
function getRiderAddress(address _riderAddress) public view returns (address) {
    return riders[_riderAddress].riderAddress;
}

    // Function to get the total number of riders
function getRidersCount() public view returns (uint256) {
    return ridersList.length;
}

}
