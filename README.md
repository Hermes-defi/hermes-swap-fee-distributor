# About

This is a minimalist hardhat deployment enviroment specific for Harmony Network.

There is 3 scripts in scripts folder used for deployment:

- 01_token_mc.js: deploy the token and MasterChef contract.
- 02_factory.js: deploy the factory and save contract info in contracts.json
- 03_router.js: deploy the router with linked factory.

# How to deploy

This are instructions how to deploy the set of contracts.

## Swap & Farming

Do `yarn` to install modules dependencies in the enviroment.
You need a .env file, here is a sample:

```javascript
PRIVATE_KEY=the private key to be used in deployment
DEV=0x7cef2432A2690168Fb8eb7118A74d5f8EfF9Ef55
MINT_AMOUNT=12000000000000000000000000
```

After installed modules dependencies, do:

### to deploy token and farming:

```bash
npx hardhat run scripts/01_token_mc.js --network testnet
```

### to deploy the swap

- deploy the factory: `npx hardhat run scripts/02_factory.js --network testnet`
- now the factory will print the current init code hash, change it in the file `contracts/hermesswap/libraries/HermesLibrary.sol`
- now the factory and the hash has been saved to contracts.json
- open the file `scripts/03_router.js` to check the weth address, you should add a if for one on your network.
- deploy the router: `npx hardhat run scripts/03_router.js --network testnet`

At this point you should have a factory and a router linked.
