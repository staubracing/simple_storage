const { ethers } = require("hardhat");
const { expect } = require("chai");

/// @title RacerRegistry

describe("RacerRegistry", function () {
    let RacerRegistry;
    let name;
    let bikeNumber;
    let racerAddress;
    let isFirstTime = true;

    beforeEach(async function () {
        RacerRegistry = await ethers.getContractFactory("RacerRegistry");
        RacerRegistry = await RacerRegistry.deploy();
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
        const testCase = testCases[i];
        const { name, bikeNumber, racerAddress} = testCase;

        /// @dev print contract address and racer address to console only once
        if (isFirstTime) {
            console.log(`First name: ${testCases[0].name}`);
            console.log(`First bike number: ${testCases[0].bikeNumber}`);
            console.log(`First racer address: ${testCases[0].racerAddress}`);

            console.log(`Second name: ${testCases[1].name}`);
            console.log(`Second bike number: ${testCases[1].bikeNumber}`);
            console.log(`Second racer address: ${testCases[1].racerAddress}`);
            isFirstTime = false;
        }

        /// @dev test case
        it(`should register racer ${name} with bike number ${bikeNumber} and racer address ${racerAddress}`, async function () {
            await RacerRegistry.registerRacer(name, bikeNumber, racerAddress);
            const racer = await RacerRegistry.racers(racerAddress);
            expect(racer.name).to.equal(name);
            expect(racer.bikeNumber).to.equal(bikeNumber);            
        }
        );
    }
});






