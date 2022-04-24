// TODO: remove unused imprts

import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-solhint"
import "@nomiclabs/hardhat-ethers"
// import "@tenderly/hardhat-tenderly"
import "@nomiclabs/hardhat-waffle"
import "@openzeppelin/hardhat-upgrades"
// import "hardhat-abi-exporter"
// import "hardhat-deploy"
// import "hardhat-deploy-ethers"
// import "hardhat-gas-reporter"
// import "hardhat-spdx-license-identifier"
import "hardhat-typechain"
// import "hardhat-watcher"
import "solidity-coverage"
// import "./tasks"

// import { HardhatUserConfig } from "hardhat/types"
import { HardhatUserConfig, task } from "hardhat/config";
// import { removeConsoleLog } from "hardhat-preprocessor"

// const accounts = {
//     mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
//     // accountsBalance: "990000000000000000000",
// }

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {


    mocha: {
        timeout: 20000,
    },
    // namedAccounts: {
    //     deployer: {
    //         default: 0,
    //     },
    //     dev: {
    //         // Default to 1
    //         default: 0,
    //     },
    //     treasury: {
    //         default: 1,
    //     },
    //     investor: {
    //         default: 2,
    //     },
    // },
    networks: {

        hardhat: {
        },

        localhost: {
            url: 'http://localhost:8545',
        },

        harmony: {
            url: "https://rpc.hermesdefi.io/",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
            chainId: 1666600000,


        },
        testnet: {
            url: "https://api.s0.b.hmny.io",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
            chainId: 1666700000,
            gasMultiplier: 2,
        },


    },
    // paths: {
    //     artifacts: "artifacts",
    //     cache: "cache",
    //     deploy: "deploy",
    //     deployments: "deployments",
    //     imports: "imports",
    //     sources: "contracts",
    //     tests: "test",
    // },

    solidity: {
        compilers: [
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },


    typechain: {
        outDir: "types",
        target: "ethers-v5",
    },

}

export default config
