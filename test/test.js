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
        

        name = "Joe";
        bikeNumber = 715;
        racerAddress = await ethers.provider.getSigner(0).getAddress();// get address of first account in hardhat.config.js (accounts[0])

        if(isFirstTime) {
        console.log("RacerRegistry deployed to:", RacerRegistry.address);
        console.log("racer address: ", racerAddress);
        isFirstTime = false;
        }
    });


    it("Should register a racer", async function () {
        await RacerRegistry.racerName(name, bikeNumber, racerAddress); // call function in contract RacerRegistry
        const racer = await RacerRegistry.racers(racerAddress); // get racer by address from mapping in contract RacerRegistry
        expect(racer.name).to.equal(name); // check if name is equal to name in contract
        console.log("racer name: ", racer.name);
    }
    );
    it("Should register a racer Bike Number", async function () {
        await RacerRegistry.racerName(name, bikeNumber, racerAddress); // call function in contract RacerRegistry
        const racer = await RacerRegistry.racers(racerAddress); // get racer by address from mapping in contract RacerRegistry
        expect(racer.bikeNumber).to.equal(bikeNumber); // check if bikeNumber is equal to bikeNumber in contract
        console.log("racer bike number: ", racer.bikeNumber);
    }
    );


  
});
