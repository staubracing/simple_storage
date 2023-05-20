
const { task } = require('hardhat/config');

require ("@nomicfoundation/hardhat-toolbox");
require ("@nomicfoundation/hardhat-chai-matchers");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};
