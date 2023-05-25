// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title RacerRegistry Contract
/// @author Staub
/// @notice A simple storage contract for registering racers

contract RacerRegistry {
    struct Racer {
        string name;
        uint16 bikeNumber;
        address racerAddress;
    }

    Racer[] public racersList;

    mapping(address => Racer) public racers;

/// @notice Sets the name, bike number, and address of a racer
/// @param _name The name of the racer
/// @param _bikeNumber The bike number of the racer
/// @param _racerAddress The address of the racer
/// @dev Requires the name and bike number to be unique   
function registerRacer(string memory _name, uint16 _bikeNumber, address _racerAddress) public {
    require(!nameExists(_name), "Name already exists");
    require(!bikeNumberExists(_bikeNumber, _racerAddress), "Bike number already exists"); // Check if bike number already exists in the list of racers
    racersList.push(Racer(_name, _bikeNumber, _racerAddress)); // Add racer to the list
    racers[_racerAddress] = Racer(_name, _bikeNumber, _racerAddress); // Add racer to the mapping
}


/// @notice Checks if the name already exists
/// @param _name The name of the racer
/// @return Returns true if the name already exists
function nameExists(string memory _name) public view returns (bool) {
    for (uint256 i = 0; i < racersList.length; i++) {
        if (keccak256(bytes(racersList[i].name)) == keccak256(bytes(_name))) {
            return true;
        }
    }
    return false;
}

/// @notice Checks if the bike number already exists
/// @param _bikeNumber The bike number of the racer
/// @param _racerAddress The address of the racer
/// @return Returns true if the bike number already exists
function bikeNumberExists(uint16 _bikeNumber, address _racerAddress) public view returns (bool) {
    for (uint256 i = 0; i < racersList.length; i++) {
        if (racersList[i].bikeNumber == _bikeNumber && racersList[i].racerAddress == _racerAddress) {
            return true;
        }
    }
    return false;
}

/// @notice Gets the name of the racer
/// @param _racerAddress The address of the racer
/// @return Returns the name of the racer
function getRacerName(address _racerAddress) public view returns (string memory) {
    return racers[_racerAddress].name;
}

/// @notice Gets the bike number of the racer
/// @param _racerAddress The address of the racer
/// @return Returns the bike number of the racer
function getRacerBikeNumber(address _racerAddress) public view returns (uint16) {
    return racers[_racerAddress].bikeNumber;
}

/// @notice Gets the address of the racer
/// @param _racerAddress The address of the racer
/// @return Returns the address of the racer
function getRacerAddress(address _racerAddress) public view returns (address) {
    return racers[_racerAddress].racerAddress;
}

/// @notice Gets a list of the names of the racers
/// @return Returns the names of the racers
function getRacerNames() public view returns (string[] memory) {
    string[] memory names = new string[](racersList.length);
    for (uint256 i = 0; i < racersList.length; i++) {
        names[i] = racersList[i].name;
    }
    return names;
}

/// @notice Gets the count of racers
/// @return Returns the count of racers
function getRacersCount() public view returns (uint256) {
    return racersList.length;
}

}
