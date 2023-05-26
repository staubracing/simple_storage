const { expect } = require("chai");

describe("RacerRegistry", function () {
  let RacerRegistry;

  beforeEach(async function () {
    RacerRegistry = await ethers.getContractFactory("RacerRegistry");
    RacerRegistry = await RacerRegistry.deploy();
    await RacerRegistry.deployed();
  });

  it("returns a list of racer names", async function () {
    const testCases = [
      {
        name: "Alice",
        bikeNumber: 123,
        racerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      },
      {
        name: "Bob",
        bikeNumber: 456,
        racerAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      },
      {
        name: "Charlie",
        bikeNumber: 789,
        racerAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      },
    ];

    for (let i = 0; i < testCases.length; i++) {
      const { name, bikeNumber, racerAddress } = testCases[i];
      await RacerRegistry.registerRacer(name, bikeNumber, racerAddress);
    }

    const racerNames = await RacerRegistry.getRacerNames();

    // Loop through the racersList array and check if each racer name is in the racerNames array
    const racersList = await RacerRegistry.racersList();
    for (let i = 0; i < racersList.length; i++) {
      const racer = racersList[i];
      expect(racerNames).to.include(racer.name);
    }
  });
});