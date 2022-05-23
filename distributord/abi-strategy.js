[
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_want",
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_poolId"
            },
            {
                "name": "_chef",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_vault",
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "address",
                "internalType": "address",
                "name": "_unirouter"
            },
            {
                "name": "_keeper",
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "_strategist",
                "internalType": "address"
            },
            {
                "internalType": "address",
                "name": "_beefyFeeRecipient",
                "type": "address"
            },
            {
                "name": "_outputToNativeRoute",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "name": "_outputToLp0Route",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "_outputToLp1Route",
                "type": "address[]"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "type": "address",
                "name": "newOwner",
                "internalType": "address",
                "indexed": true
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event",
        "anonymous": false
    },
    {
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address",
                "indexed": false
            }
        ],
        "anonymous": false,
        "type": "event"
    },
    {
        "anonymous": false,
        "name": "StratHarvest",
        "type": "event",
        "inputs": [
            {
                "internalType": "address",
                "name": "harvester",
                "indexed": true,
                "type": "address"
            }
        ]
    },
    {
        "name": "Unpaused",
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "MAX_CALL_FEE",
        "type": "function",
        "inputs": []
    },
    {
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "MAX_FEE",
        "type": "function",
        "stateMutability": "view"
    },
    {
        "name": "STRATEGIST_FEE",
        "type": "function",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "inputs": []
    },
    {
        "type": "function",
        "name": "WITHDRAWAL_FEE_CAP",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "inputs": [],
        "name": "WITHDRAWAL_MAX",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "beefyFee",
        "stateMutability": "view",
        "inputs": [],
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "beefyFeeRecipient",
        "inputs": []
    },
    {
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "name": "callFee",
        "type": "function",
        "inputs": []
    },
    {
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "type": "function",
        "stateMutability": "view",
        "name": "chef"
    },
    {
        "type": "function",
        "outputs": [
            {
                "internalType": "bool",
                "type": "bool",
                "name": ""
            }
        ],
        "name": "harvestOnDeposit",
        "inputs": [],
        "stateMutability": "view"
    },
    {
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "keeper",
        "type": "function"
    },
    {
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "inputs": [],
        "stateMutability": "view",
        "name": "lastHarvest"
    },
    {
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "lpToken0"
    },
    {
        "type": "function",
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "name": "lpToken1",
        "stateMutability": "view",
        "inputs": []
    },
    {
        "name": "native",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "inputs": [],
        "type": "function",
        "stateMutability": "view"
    },
    {
        "name": "nativeToOutputRoute",
        "stateMutability": "view",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [],
        "type": "function",
        "stateMutability": "view",
        "name": "output",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "name": "outputToLp0Route",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "stateMutability": "view"
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "name": "outputToLp1Route",
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ],
        "type": "function"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "name": "outputToNativeRoute",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "owner",
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": ""
            }
        ]
    },
    {
        "outputs": [
            {
                "internalType": "bool",
                "type": "bool",
                "name": ""
            }
        ],
        "name": "paused",
        "type": "function",
        "stateMutability": "view",
        "inputs": []
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "poolId"
    },
    {
        "outputs": [],
        "type": "function",
        "inputs": [],
        "name": "renounceOwnership",
        "stateMutability": "nonpayable"
    },
    {
        "name": "setBeefyFeeRecipient",
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "_beefyFeeRecipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setCallFee",
        "stateMutability": "nonpayable",
        "outputs": [],
        "inputs": [
            {
                "type": "uint256",
                "name": "_fee",
                "internalType": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "name": "_keeper",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "name": "setKeeper",
        "type": "function",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "outputs": [],
        "inputs": [
            {
                "name": "_strategist",
                "type": "address",
                "internalType": "address"
            }
        ],
        "name": "setStrategist",
        "stateMutability": "nonpayable"
    },
    {
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "_unirouter"
            }
        ],
        "name": "setUnirouter",
        "type": "function",
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "outputs": [],
        "stateMutability": "nonpayable",
        "name": "setVault",
        "inputs": [
            {
                "name": "_vault",
                "type": "address",
                "internalType": "address"
            }
        ],
        "type": "function"
    },
    {
        "outputs": [],
        "name": "setWithdrawalFee",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_fee"
            }
        ],
        "type": "function"
    },
    {
        "name": "strategist",
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "inputs": []
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "name": "newOwner",
                "internalType": "address"
            }
        ],
        "name": "transferOwnership",
        "stateMutability": "nonpayable",
        "outputs": []
    },
    {
        "inputs": [],
        "type": "function",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "name": "unirouter",
        "stateMutability": "view"
    },
    {
        "type": "function",
        "stateMutability": "view",
        "inputs": [],
        "name": "vault",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "name": "want",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "inputs": []
    },
    {
        "name": "withdrawalFee",
        "type": "function",
        "inputs": [],
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "deposit",
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "inputs": []
    },
    {
        "stateMutability": "nonpayable",
        "name": "withdraw",
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": [],
        "type": "function"
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "beforeDeposit",
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "inputs": [],
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "harvest"
    },
    {
        "outputs": [],
        "type": "function",
        "inputs": [],
        "name": "managerHarvest",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "inputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "inputs": [],
        "name": "balanceOfWant"
    },
    {
        "inputs": [],
        "type": "function",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "balanceOfPool"
    },
    {
        "type": "function",
        "name": "retireStrat",
        "stateMutability": "nonpayable",
        "outputs": [],
        "inputs": []
    },
    {
        "name": "rewardsAvailable",
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "callReward",
        "stateMutability": "view",
        "type": "function"
    },
    {
        "name": "setHarvestOnDeposit",
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "inputs": [
            {
                "internalType": "bool",
                "name": "_harvestOnDeposit",
                "type": "bool"
            }
        ]
    },
    {
        "name": "panic",
        "type": "function",
        "outputs": [],
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "inputs": [],
        "outputs": [],
        "name": "pause",
        "stateMutability": "nonpayable"
    },
    {
        "stateMutability": "nonpayable",
        "name": "unpause",
        "inputs": [],
        "type": "function",
        "outputs": []
    }
]
