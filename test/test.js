const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("RacerRegistry", function () {
    let RacerRegistry;
    let name;
    let bikeNumber;
    let riderAddress;

    beforeEach(async function () {
        RacerRegistry = await ethers.getContractFactory("RacerRegistry");
        RacerRegistry = await RacerRegistry.deploy();
        await RacerRegistry.deployed();

        name = "Joe Slow";
        bikeNumber = 715;
        riderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    });
    /// @notice Test that the contract is deployed
    it("Should deploy the contract", async function () {
        expect(await RacerRegistry.deployed()).to.equal(RacerRegistry);
    }
    );
    
    it("Should register a racer", async function () {
        await RacerRegistry.racerName(name, bikeNumber, riderAddress);
        expect(await RacerRegistry.racerCount()).to.equal(1);
    }
    );
});

