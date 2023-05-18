// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title RacerRegistry Contract
/// @author Staub
/// @notice A simple storage contract for managing racers

contract RacerRegistry {
    struct Rider {
        string name;
        uint16 bikeNumber;
        address riderAddress;
    }

    Rider[] public ridersList;

    mapping(address => Rider) public riders;

/// @notice Sets the name, bike number, and address of a rider
/// @param _name The name of the rider
/// @param _bikeNumber The bike number of the rider
/// @param _riderAddress The address of the rider
/// @dev Requires the name and bike number to be unique   
function racerName(string memory _name, uint16 _bikeNumber, address _riderAddress) public {
    require(!nameExists(_name), "Name already exists");
    require(!bikeNumberExists(_bikeNumber, _riderAddress), "Bike number already exists"); // Check if bike number already exists in the list of riders 
    ridersList.push(Rider(_name, _bikeNumber, _riderAddress)); // Add rider to the list
    riders[_riderAddress] = Rider(_name, _bikeNumber, _riderAddress); // Add rider to the mapping
}

/// @notice Sets the bike number and address of a rider
/// @param _bikeNumber The bike number of the rider
/// @param _riderAddress The address of the rider
/// @dev Requires the bike number to be unique
function racerBikeNumber(uint16 _bikeNumber, address _riderAddress) public {
    require(!bikeNumberExists(_bikeNumber, _riderAddress), "Bike number already exists"); // Check if bike number already exists in the list of riders 
    ridersList.push(Rider(riders[_riderAddress].name, _bikeNumber, _riderAddress)); // Add rider to the list
    riders[_riderAddress] = Rider(riders[_riderAddress].name, _bikeNumber, _riderAddress); // Add rider to the mapping
}

/// @notice Checks if the name already exists
/// @param _name The name of the rider
/// @return Returns true if the name already exists
function nameExists(string memory _name) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (keccak256(bytes(ridersList[i].name)) == keccak256(bytes(_name))) {
            return true;
        }
    }
    return false;
}

/// @notice Checks if the bike number already exists
/// @param _bikeNumber The bike number of the rider
/// @param _riderAddress The address of the rider
/// @return Returns true if the bike number already exists
function bikeNumberExists(uint16 _bikeNumber, address _riderAddress) public view returns (bool) {
    for (uint256 i = 0; i < ridersList.length; i++) {
        if (ridersList[i].bikeNumber == _bikeNumber && ridersList[i].riderAddress != _riderAddress) {
            return true;
        }
    }
    return false;
}

/// @notice Gets the name of the rider
/// @param _riderAddress The address of the rider
/// @return Returns the name of the rider
function getRiderName(address _riderAddress) public view returns (string memory) {
    return riders[_riderAddress].name;
}

/// @notice Gets the bike number of the rider
/// @param _riderAddress The address of the rider
/// @return Returns the bike number of the rider
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

/// @notice Gets the address of the rider
/// @param _riderAddress The address of the rider
/// @return Returns the address of the rider
function getRiderAddress(address _riderAddress) public view returns (address) {
    return riders[_riderAddress].riderAddress;
}

/// @notice Gets the count of riders
/// @return Returns the count of riders
function getRidersCount() public view returns (uint256) {
    return ridersList.length;
}

}
