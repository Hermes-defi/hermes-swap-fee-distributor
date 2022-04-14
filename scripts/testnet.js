const hre = require("hardhat");
const fs = require('fs');
// npx hardhat run scripts\testnet.js --network testnet
async function main() {

    const _Distributor = await hre.ethers.getContractFactory("Distributor");

    const _router = '0x6397d74A7724287a5A58e625afF8D396DbeE2f9B'
    const _treasury = '0x78B3Ec25D285F7a9EcA8Da8eb6b20Be4d5D70E84'
    const _xHRMSAddress = '0x5888801091Ee32EEb4F96FD70A43F6a26CAf1aC7'
    const _sHRMSAddress = '0xAb728Cd1B558c6a755412E9D490b2140DC0e8F9A'
    const _ust = '0x33B465B61EBb322E6336437b2624F705a34a0Df0'
    const _HRMS = '0x6D401016d0515F6d471952001b8e571364D666d6'

    const Distributor = await _Distributor.deploy(
      _router,
      _treasury,
      _xHRMSAddress,
      _sHRMSAddress,
      _ust,
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
