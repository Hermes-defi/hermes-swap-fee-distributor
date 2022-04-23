const hre = require("hardhat");
const fs = require('fs');
// npx hardhat run scripts\testnet.js --network testnet
async function main() {

    const _Distributor = await hre.ethers.getContractFactory("Distributor");

    const _router = '0x6397d74A7724287a5A58e625afF8D396DbeE2f9B'
    const _treasury = '0x78B3Ec25D285F7a9EcA8Da8eb6b20Be4d5D70E84'
    const _xHRMSAddress = '0xBf4d0BC6A6E1f356151D8258a2f801990A3EF307'
    const _sHRMSAddress = '0x42B2D32B047bD2576e82Ba4628689BA1522129F4'
    const _ust = '0x57dDc3FffECe5FfcfDB3170266cB564A52Ee2540'
    const _HRMS = '0x53EA989fbD576d162C534aD371992842f1fE791B'

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
