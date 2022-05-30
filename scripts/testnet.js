const hre = require("hardhat");
const fs = require('fs');
// npx hardhat run scripts\testnet.js --network harmony
async function main() {

    const _Distributor = await hre.ethers.getContractFactory("Distributor");

    const _router = '0x7c7ae5e673d651bbE3ED96444B0E1fB4A53C443A'
    const _treasury = '0x79dE631fFb7291Acdb50d2717AE32D44D5D00732'
    const _xHRMSAddress = '0xaEF2F6DF547c39A2E9c67c83dA8ef8A60a9FbD62'
    const _sHRMSAddress = '0x3d903110822dd0d1aacff679d41c2d8d03643945'
    const _1usdc = '0x985458E523dB3d53125813eD68c274899e9DfAb4'
    const _HRMS = '0x80C3B9d4938514819b1Bba484295f915059aDac7'

    const Distributor = await _Distributor.deploy(
      _router,
      _treasury,
      _xHRMSAddress,
      _sHRMSAddress,
      _1usdc,
      _HRMS
    );
    await Distributor.deployed();
    console.log("Distributor:", Distributor.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
