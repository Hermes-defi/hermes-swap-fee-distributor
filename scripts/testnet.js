const hre = require("hardhat");
const fs = require('fs');
// npx hardhat run scripts\testnet.js --network harmony
async function main() {

    const _Distributor = await hre.ethers.getContractFactory("Distributor");

    const _router = '0x0A34fE479d2442fB51333ac373dD2CBF02B6D949'
    const _treasury = '0x79dE631fFb7291Acdb50d2717AE32D44D5D00732'
    const _xHRMSAddress = '0x28A4E128f823b1b3168f82F64Ea768569a25a37F'
    const _sHRMSAddress = '0x8812420fb6E5d971C969CcEF2275210AB8D014f0'
    const _1usdc = '0x985458E523dB3d53125813eD68c274899e9DfAb4'
    const _HRMS = '0xba4476a302f5bc1dc4053cf79106dc43455904a3'

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
