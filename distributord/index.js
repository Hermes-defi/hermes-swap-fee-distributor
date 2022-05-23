"use strict";
process.on('uncaughtException', function (err) {
    console.log(err.toString());
    process.exit(0);
});
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
require('dotenv').config({path: '../.env'});

const fs = require("fs")
const Web3 = require("web3")
const abi_compounder = JSON.parse(fs.readFileSync("./abi.js", "utf8"));

const wallet = process.env.WALLET;
const pkey = process.env.PRIVATE_KEY

if( ! wallet ){
    red('WALLET NOT FOUND IN config.txt');
    process.exit(0);
}
if( ! pkey ){
    red('PRIVATE_KEY NOT FOUND IN config.txt');
    process.exit(0);
}

const chalk = require('chalk');
let yellowBright = function () {
    console.log(chalk.yellowBright(...arguments));
}
let magenta = function () {
    console.log(chalk.magenta(...arguments));
}
let cyan = function () {
    console.log(chalk.cyan(...arguments));
}
let yellow = function () {
    console.log(chalk.yellow(...arguments));
}
let red = function () {
    console.log(chalk.red(...arguments));
}
let blue = function () {
    console.log(chalk.blue(...arguments));
}
let green = function () {
    console.log(chalk.green(...arguments));
}

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC))
const gasPrice = process.env.GAS_PRICE ? process.env.GAS_PRICE : "4000000000" // 4 gwei

const main = async () => {
    const compounder = new web3.eth.Contract(abi_compounder, process.env.COMPOUNDER);
    try {
        const timeStart = new Date().getTime() / 1000;
        let balance = await web3.eth.getBalance(wallet);
        balance = new Number(balance / 1e18).toFixed(3);

        if (balance < 0.1) {
            red('STOP! BALANCE OF ' + wallet + ' IS INSUFFICIENT: ' + balance);
            return;
        }
        blue('compounder: ' + process.env.COMPOUNDER);
        blue('wallet: ' + wallet + ' balance=' + balance);
        await exec(compounder);
        let balanceAfter = await web3.eth.getBalance(wallet);
        balanceAfter = new Number(balanceAfter / 1e18).toFixed(3);

        const cost = balance - balanceAfter;
        const times = balanceAfter / cost;
        const timeEnd = new Date().getTime() / 1000;
        const totalTime = timeEnd - timeStart;
        cyan('----------------------------------------------------------------------');
        yellowBright('- wallet: ' + wallet + ' balance=' + balanceAfter);
        yellowBright('- cost of execution=' + cost);
        yellowBright('- you can run this script more ' + times + ' times');
        yellowBright('- execution time ' + parseFloat(totalTime).toFixed('0') + ' seconds.');
    } catch (e) {
        red(e.toString());
    }


}

async function timeout(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

const exec = async (compounder) => {
    try {

        const transaction = await compounder.methods.run()
        const signed = await web3.eth.accounts.signTransaction(
            {
                to: compounder._address,
                data: transaction.encodeABI(),
                gas: process.env.GAS,
                gasPrice: gasPrice,
            },
            pkey
        )
        web3.eth
            .sendSignedTransaction(signed.rawTransaction)
            .on("transactionHash", (payload) => {
                green(`\ttx: ${payload}`)
            })
            .then((receipt) => {
                // magenta(i, ' ', strategy, symbol, supply);
            })
            .catch((e) => {
                red(e);
            })
    } catch (e) {
        red(`\t${e.toString()}`)
    }
}

const EXECUTE_INTERVAL = process.env.EXECUTE_INTERVAL ? parseInt(process.env.EXECUTE_INTERVAL)*1000 : 300000;
yellow('Execute every: '+EXECUTE_INTERVAL+' ms.');
setInterval(main, EXECUTE_INTERVAL )
main();
