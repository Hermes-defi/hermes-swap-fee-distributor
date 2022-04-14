const mc_abi = [
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "_hermes",
        "internalType": "contract IHermesToken"
      },
      {
        "name": "_devAddr",
        "internalType": "address",
        "type": "address"
      },
      {
        "name": "_treasuryAddr",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_investorAddr",
        "internalType": "address",
        "type": "address"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_hermesPerSec"
      },
      {
        "internalType": "uint256",
        "name": "_startTimestamp",
        "type": "uint256"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_devPercent"
      },
      {
        "name": "_treasuryPercent",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_investorPercent"
      }
    ]
  },
  {
    "inputs": [
      {
        "type": "uint256",
        "name": "pid",
        "internalType": "uint256",
        "indexed": true
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false,
        "name": "allocPoint"
      },
      {
        "name": "lpToken",
        "type": "address",
        "internalType": "contract IERC20",
        "indexed": true
      },
      {
        "indexed": true,
        "name": "rewarder",
        "type": "address",
        "internalType": "contract IRewarder"
      }
    ],
    "name": "Add",
    "type": "event",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address",
        "indexed": true
      },
      {
        "name": "pid",
        "internalType": "uint256",
        "type": "uint256",
        "indexed": true
      },
      {
        "indexed": false,
        "type": "uint256",
        "internalType": "uint256",
        "name": "amount"
      }
    ],
    "name": "Deposit",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "indexed": true,
        "type": "address"
      },
      {
        "name": "pid",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "name": "EmergencyWithdraw",
    "anonymous": false
  },
  {
    "anonymous": false,
    "name": "Harvest",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256",
        "indexed": true
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "type": "uint256",
        "name": "amount"
      }
    ],
    "type": "event"
  },
  {
    "anonymous": false,
    "name": "OwnershipTransferred",
    "type": "event",
    "inputs": [
      {
        "name": "previousOwner",
        "internalType": "address",
        "type": "address",
        "indexed": true
      },
      {
        "name": "newOwner",
        "indexed": true,
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "type": "uint256",
        "name": "pid",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "allocPoint",
        "indexed": false,
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "internalType": "contract IRewarder",
        "name": "rewarder",
        "indexed": true,
        "type": "address"
      },
      {
        "type": "bool",
        "name": "overwrite",
        "internalType": "bool",
        "indexed": false
      }
    ],
    "name": "Set",
    "type": "event"
  },
  {
    "name": "SetDevAddress",
    "type": "event",
    "inputs": [
      {
        "internalType": "address",
        "indexed": true,
        "type": "address",
        "name": "oldAddress"
      },
      {
        "name": "newAddress",
        "indexed": true,
        "type": "address",
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "UpdateEmissionRate",
    "inputs": [
      {
        "name": "user",
        "internalType": "address",
        "indexed": true,
        "type": "address"
      },
      {
        "type": "uint256",
        "name": "_hermesPerSec",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "type": "event",
    "anonymous": false
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "pid",
        "indexed": true
      },
      {
        "name": "lastRewardTimestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "lpSupply",
        "internalType": "uint256",
        "type": "uint256",
        "indexed": false
      },
      {
        "internalType": "uint256",
        "type": "uint256",
        "indexed": false,
        "name": "accHermesPerShare"
      }
    ],
    "name": "UpdatePool",
    "type": "event"
  },
  {
    "anonymous": false,
    "type": "event",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256",
        "indexed": true
      },
      {
        "type": "uint256",
        "indexed": false,
        "name": "amount",
        "internalType": "uint256"
      }
    ],
    "name": "Withdraw"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "type": "uint256",
        "name": "request",
        "internalType": "uint256",
        "indexed": false
      },
      {
        "name": "sent",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false
      }
    ],
    "name": "hermesTransfer",
    "type": "event",
    "anonymous": false
  },
  {
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "internalType": "uint256",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "blockDeltaEndStage"
  },
  {
    "outputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "blockDeltaStartStage"
  },
  {
    "name": "devAddr",
    "stateMutability": "view",
    "inputs": [],
    "type": "function",
    "outputs": [
      {
        "internalType": "address",
        "type": "address",
        "name": ""
      }
    ],
    "constant": true,
    "signature": "0xda09c72c"
  },
  {
    "type": "function",
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view",
    "name": "devFeeStage",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ]
  },
  {
    "type": "function",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "devPercent",
    "inputs": [],
    "stateMutability": "view",
    "constant": true,
    "signature": "0xfc3c28af"
  },
  {
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract IHermesToken"
      }
    ],
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "name": "hermes",
    "constant": true,
    "signature": "0xd8092c92"
  },
  {
    "stateMutability": "view",
    "name": "hermesPerSec",
    "inputs": [],
    "type": "function",
    "outputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ],
    "constant": true,
    "signature": "0xaa3448ab"
  },
  {
    "inputs": [],
    "type": "function",
    "stateMutability": "view",
    "name": "investorAddr",
    "outputs": [
      {
        "internalType": "address",
        "type": "address",
        "name": ""
      }
    ],
    "constant": true,
    "signature": "0xacc4cc50"
  },
  {
    "type": "function",
    "name": "investorPercent",
    "inputs": [],
    "stateMutability": "view",
    "outputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": ""
      }
    ],
    "constant": true,
    "signature": "0x0735b208"
  },
  {
    "type": "function",
    "outputs": [
      {
        "type": "address",
        "internalType": "address",
        "name": ""
      }
    ],
    "stateMutability": "view",
    "name": "owner",
    "inputs": [],
    "constant": true,
    "signature": "0x8da5cb5b"
  },
  {
    "type": "function",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "type": "address",
        "name": "lpToken"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "allocPoint"
      },
      {
        "name": "lastRewardTimestamp",
        "internalType": "uint256",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "accHermesPerShare"
      },
      {
        "internalType": "contract IRewarder",
        "type": "address",
        "name": "rewarder"
      }
    ],
    "stateMutability": "view",
    "name": "poolInfo",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "inputs": [],
    "stateMutability": "view",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "name": "startTimestamp",
    "constant": true,
    "signature": "0xe6fd48bc"
  },
  {
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": ""
      }
    ],
    "stateMutability": "view",
    "name": "totalAllocPoint",
    "constant": true,
    "signature": "0x17caf6f1"
  },
  {
    "inputs": [
      {
        "type": "address",
        "internalType": "address",
        "name": "newOwner"
      }
    ],
    "stateMutability": "nonpayable",
    "name": "transferOwnership",
    "type": "function",
    "outputs": []
  },
  {
    "name": "treasuryAddr",
    "stateMutability": "view",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "constant": true,
    "signature": "0x30d9a62a"
  },
  {
    "stateMutability": "view",
    "inputs": [],
    "type": "function",
    "name": "treasuryPercent",
    "outputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": ""
      }
    ],
    "constant": true,
    "signature": "0x04ef9d58"
  },
  {
    "type": "function",
    "stateMutability": "view",
    "name": "userFeeStage",
    "outputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "userInfo",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "type": "function",
    "outputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "amount"
      },
      {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      },
      {
        "type": "uint256",
        "name": "lastWithdrawBlock",
        "internalType": "uint256"
      },
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "firstDepositBlock"
      },
      {
        "type": "uint256",
        "name": "blockdelta",
        "internalType": "uint256"
      },
      {
        "name": "lastDepositBlock",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "name": "poolLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "constant": true,
    "signature": "0x081e3eda"
  },
  {
    "type": "function",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_allocPoint"
      },
      {
        "internalType": "contract IERC20",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "type": "address",
        "internalType": "contract IRewarder",
        "name": "_rewarder"
      }
    ],
    "stateMutability": "nonpayable",
    "name": "add",
    "outputs": []
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_pid"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_allocPoint"
      },
      {
        "name": "_rewarder",
        "internalType": "contract IRewarder",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "overwrite",
        "type": "bool"
      }
    ],
    "name": "set",
    "outputs": [],
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "outputs": [
      {
        "name": "pendingHermes",
        "internalType": "uint256",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "type": "address",
        "name": "bonusTokenAddress"
      },
      {
        "internalType": "string",
        "type": "string",
        "name": "bonusTokenSymbol"
      },
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "pendingBonusToken"
      }
    ],
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "type": "address",
        "internalType": "address",
        "name": "_user"
      }
    ],
    "name": "pendingTokens",
    "type": "function",
    "stateMutability": "view",
    "constant": true,
    "signature": "0xffcd4263"
  },
  {
    "stateMutability": "view",
    "name": "rewarderBonusTokenInfo",
    "inputs": [
      {
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
      }
    ],
    "type": "function",
    "outputs": [
      {
        "name": "bonusTokenAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "type": "string",
        "internalType": "string",
        "name": "bonusTokenSymbol"
      }
    ]
  },
  {
    "type": "function",
    "name": "massUpdatePools",
    "stateMutability": "nonpayable",
    "outputs": [],
    "inputs": []
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "name": "updatePool",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_pid"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "inputs": [
      {
        "name": "_pid",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": []
  },
  {
    "type": "function",
    "inputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_pid"
      },
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_amount"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
    "name": "withdraw"
  },
  {
    "name": "userDelta",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_pid"
      },
      {
        "internalType": "address",
        "type": "address",
        "name": "_user"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": ""
      }
    ],
    "type": "function",
    "stateMutability": "view"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_pid"
      }
    ],
    "outputs": [],
    "type": "function",
    "stateMutability": "nonpayable",
    "name": "emergencyWithdraw"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_devAddr",
        "type": "address"
      }
    ],
    "type": "function",
    "outputs": [],
    "stateMutability": "nonpayable",
    "name": "dev"
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setDevPercent",
    "inputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_newDevPercent"
      }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "_treasuryAddr",
        "type": "address"
      }
    ],
    "name": "setTreasuryAddr",
    "outputs": []
  },
  {
    "inputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_newTreasuryPercent"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setTreasuryPercent"
  },
  {
    "type": "function",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "_investorAddr",
        "internalType": "address"
      }
    ],
    "name": "setInvestorAddr",
    "stateMutability": "nonpayable"
  },
  {
    "name": "setInvestorPercent",
    "inputs": [
      {
        "internalType": "uint256",
        "type": "uint256",
        "name": "_newInvestorPercent"
      }
    ],
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": []
  },
  {
    "outputs": [],
    "type": "function",
    "stateMutability": "nonpayable",
    "name": "updateEmissionRate",
    "inputs": [
      {
        "type": "uint256",
        "internalType": "uint256",
        "name": "_hermesPerSec"
      }
    ]
  },
  {
    "type": "function",
    "outputs": [],
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "uint256[]",
        "type": "uint256[]",
        "name": "_blockStarts"
      }
    ],
    "name": "setStageStarts"
  },
  {
    "type": "function",
    "outputs": [],
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "_blockEnds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "name": "setStageEnds"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_userFees",
        "type": "uint256[]"
      }
    ],
    "name": "setUserFeeStage",
    "outputs": [],
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setDevFeeStage",
    "inputs": [
      {
        "type": "uint256[]",
        "name": "_devFees",
        "internalType": "uint256[]"
      }
    ],
    "type": "function"
  }
];
