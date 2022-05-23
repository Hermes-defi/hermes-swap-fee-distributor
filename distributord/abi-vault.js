[
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "internalType": "contract IStrategy",
                "name": "_strategy",
                "type": "address"
            },
            {
                "type": "string",
                "internalType": "string",
                "name": "_name"
            },
            {
                "internalType": "string",
                "type": "string",
                "name": "_symbol"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_approvalDelay"
            }
        ],
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "spender",
                "indexed": true,
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "indexed": false,
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "Approval",
        "anonymous": false,
        "type": "event"
    },
    {
        "type": "event",
        "inputs": [
            {
                "indexed": false,
                "name": "implementation",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "NewStratCandidate",
        "anonymous": false
    },
    {
        "name": "OwnershipTransferred",
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "type": "address",
                "name": "previousOwner",
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "indexed": true,
                "type": "address",
                "internalType": "address"
            }
        ],
        "type": "event"
    },
    {
        "name": "Transfer",
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "to",
                "indexed": true,
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false,
                "name": "value"
            }
        ]
    },
    {
        "name": "UpgradeStrat",
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "implementation",
                "indexed": false,
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "allowance",
        "stateMutability": "view",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "owner"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "spender"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "approvalDelay",
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0xe2d1e75c"
    },
    {
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "spender"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "approve"
    },
    {
        "inputs": [
            {
                "name": "account",
                "internalType": "address",
                "type": "address"
            }
        ],
        "type": "function",
        "stateMutability": "view",
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "constant": true,
        "signature": "0x313ce567"
    },
    {
        "inputs": [
            {
                "name": "spender",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "subtractedValue",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "addedValue",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ]
    },
    {
        "outputs": [
            {
                "type": "string",
                "name": "",
                "internalType": "string"
            }
        ],
        "inputs": [],
        "name": "name",
        "type": "function",
        "stateMutability": "view",
        "constant": true,
        "signature": "0x06fdde03"
    },
    {
        "stateMutability": "view",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ],
        "type": "function",
        "constant": true,
        "signature": "0x8da5cb5b"
    },
    {
        "outputs": [],
        "inputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "renounceOwnership"
    },
    {
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "implementation"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "proposedTime"
            }
        ],
        "stateMutability": "view",
        "name": "stratCandidate",
        "type": "function",
        "inputs": [],
        "constant": true,
        "signature": "0x76dfabb8"
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "contract IStrategy",
                "name": "",
                "type": "address"
            }
        ],
        "name": "strategy",
        "type": "function",
        "constant": true,
        "signature": "0xa8c62e76"
    },
    {
        "name": "symbol",
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "constant": true,
        "signature": "0x95d89b41"
    },
    {
        "name": "totalSupply",
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "inputs": [],
        "constant": true,
        "signature": "0x18160ddd"
    },
    {
        "name": "transfer",
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "amount",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "internalType": "bool",
                "name": ""
            }
        ]
    },
    {
        "name": "transferFrom",
        "outputs": [
            {
                "type": "bool",
                "internalType": "bool",
                "name": ""
            }
        ],
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "type": "address",
                "name": "recipient",
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ]
    },
    {
        "name": "transferOwnership",
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "name": "want",
        "outputs": [
            {
                "name": "",
                "internalType": "contract IERC20",
                "type": "address"
            }
        ],
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x1f1fcd51"
    },
    {
        "name": "balance",
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "inputs": [],
        "constant": true,
        "signature": "0xb69ef8a8"
    },
    {
        "inputs": [],
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "name": "available",
        "constant": true,
        "signature": "0x48a0d754"
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "name": "getPricePerFullShare",
        "constant": true,
        "signature": "0x77c7b8fc"
    },
    {
        "outputs": [],
        "stateMutability": "nonpayable",
        "name": "depositAll",
        "type": "function",
        "inputs": []
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "outputs": [],
        "type": "function",
        "name": "deposit",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "earn",
        "inputs": [],
        "outputs": []
    },
    {
        "name": "withdrawAll",
        "inputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": []
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_shares"
            }
        ],
        "outputs": [],
        "name": "withdraw",
        "type": "function",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "proposeStrat",
        "inputs": [
            {
                "type": "address",
                "name": "_implementation",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "name": "upgradeStrat",
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function",
        "inputs": []
    },
    {
        "type": "function",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "name": "inCaseTokensGetStuck",
        "outputs": []
    }
]
