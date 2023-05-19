const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("RacerRegistry", function () {
    let RacerRegistry;
    let name;
    let bikeNumber;
    let riderAddress;

    beforeEach(async function () {
        RacerRegistry = await ethers.getContractFactory("RacerRegistry");
        RacerRegistryacerRegistry = await RacerRegistry.deploy();
        await RacerRegistry.deployed();

        name = "Joe Slow";
        bikeNumber = 715;
        riderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
         

    });

