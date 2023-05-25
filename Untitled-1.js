
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
            const { name, bikeNumber, racerAddress } = testCase;

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

            /// @dev test case Get racer address
            // it(`should return racer address ${racerAddress}`, async function () {
            //     const racerAddress = await RacerRegistry.getRacerAddress(name);
            //     expect(racerAddress).to.equal(racerAddress);
            //     console.log(`Racer address: ${racerAddress}`);
            // });

            /// @dev test case Get racer count
            if (i === testCases.length - 1) {
                it(`should return racer count 2`, async function () {
                    const racerCount = await RacerRegistry.getRacersCount();
                    expect(racerCount).to.equal(2);
                    console.log(`Racer count: ${racerCount}`);
                });
            }
        }
            expect(racerCount).to.equal(2);
            console.log(`Racer count: ${racerCount}`);
        }