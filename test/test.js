const { ethers } = require("hardhat");
const { expect } = require("chai");

/// @title RacerRegistry

describe("RacerRegistry", function () {
    let RacerRegistry;
    
    before(async function () {
        RacerRegistry = await ethers.getContractFactory("RacerRegistry");
        RacerRegistry = await RacerRegistry.deploy();
        console.log(`RacerRegistry contract Address: ${RacerRegistry.address}`);
        await RacerRegistry.deployed();
    });

    /// @dev set variables
    const testCases = [
        {
            name: "Joe",
            bikeNumber: 715,
            racerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        },
        {
            name: "Chris",
            bikeNumber: 106,
            racerAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        }
    ];

    /// @dev loop through test cases
    for (let i = 0; i < testCases.length; i++) {
        const _testCase = testCases[i];
        const { name, bikeNumber, racerAddress } = _testCase;

        /// @dev test case registerRacer
        it(`should register racer ${name} with bike number ${bikeNumber} and racer address ${racerAddress}`, async function () {
            await RacerRegistry.registerRacer(name, bikeNumber, racerAddress);
            const racer = await RacerRegistry.racers(racerAddress);
            expect(racer.name).to.equal(name);
            expect(racer.bikeNumber).to.equal(bikeNumber);
            expect(racer.racerAddress).to.equal(racerAddress);
            console.log(`Racer name: ${racer.name}, Bike number: ${racer.bikeNumber}, Racer address: ${racer.racerAddress}`);
        });

        /// @dev test case Nameexists
        it(`should return true if racer name ${name} exists`, async function () {
            const nameExists = await RacerRegistry.nameExists(name);
            expect(nameExists).to.equal(true);
            console.log(`Name exists: ${nameExists}`);
        });

        /// @dev test case BikeNumberExists
        it(`should return true if racer bike number ${bikeNumber} exists`, async function () {
            const bikeNumberExists = await RacerRegistry.bikeNumberExists(bikeNumber, racerAddress);
            expect(bikeNumberExists).to.equal(true);
            console.log(`Bike number exists: ${bikeNumberExists}`);
        });

        /// @dev test case Get racer name
        it(`should return racer name ${name}`, async function () {
            const racerName = await RacerRegistry.getRacerName(racerAddress);
            expect(racerName).to.equal(name);
            console.log(`Racer name: ${racerName}`);
        });

        /// @dev test case Get racer bike number
        it(`should return racer bike number ${bikeNumber}`, async function () {
            const racerBikeNumber = await RacerRegistry.getRacerBikeNumber(racerAddress);
            expect(racerBikeNumber).to.equal(bikeNumber);
            console.log(`Racer bike number: ${racerBikeNumber}`);
        });
                
        
    }
           
    
    

    
});

        
    


    
    
    















