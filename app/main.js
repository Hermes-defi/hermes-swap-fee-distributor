const CONTRACT = "0x23274A2c1334bC3d85DF2E14efCC3c8235ADb714";
const _factory = "0xC6cD3Af655E14a0030995C82a2a65f28fb3ff9f3";
let web3, account, contract, router, factory, hrms, pairCtx;

async function accountLoad() {
  if (window.ethereum) {
    const r = await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    account = r[0];
    return true;
  }
  return false;
}

async function main() {
  const enabled = await accountLoad();
  if (enabled) {
    $("#account").val(account);
    initContract();
  } else {
    $("#ethEnabled").html("no");
  }
}

async function initContract() {
  // contract = new web3.eth.Contract(mc_abi, '0x4557a506d0eeba51ca2e884ad19dd299037f9d35');
  // const r1 = await contract.methods.poolInfo('0').call();
  // console.log('r1', r1);
  // const r = await contract.methods.pendingTokens('0', '0xb63F27E0E5A4c463e056DC835821f0BEE339406A').call();
  // console.log('r', r);

  contract = new web3.eth.Contract(abi, CONTRACT);
  const blockNumber = await web3.eth.getBlockNumber();
  const _router = await contract.methods.router().call();
  const hrmsToken = await contract.methods.HRMS().call();
  router = new web3.eth.Contract(router_abi, _router);

  hrms = new web3.eth.Contract(erc20_abi, hrmsToken);
  const allowance = await hrms.methods.allowance(account, router._address).call();
  $("#allowance").html(web3.utils.fromWei(allowance.toString()));

  $("#blockNumber").html("Block: " + blockNumber);
  $("#ACCOUNT").html(account);
  $("#router").html(_router);
  $("#treasury").html(await contract.methods.treasury().call());
  $("#xHRMSAddress").html(await contract.methods.xHRMSAddress().call());
  $("#sHRMSAddress").html(await contract.methods.sHRMSAddress().call());
  $("#ust").html(await contract.methods.ust().call());
  $("#HRMS").html(hrmsToken);

  const wone = await contract.methods.wone().call();

  $("#addLiquidityONEToken").val(hrmsToken);
  $("#wone").html(wone);


  factory = new web3.eth.Contract(factory_abi, _factory);
  const factoryAddress = await factory.methods.getPair(hrmsToken, wone).call();
  $("#factoryAddress").html(factoryAddress);

  pairCtx = new web3.eth.Contract(pair_abi, factoryAddress);
  const lpBalanceOfUser = await pairCtx.methods.balanceOf(account).call();
  const lpBalanceOfCtx = await pairCtx.methods.balanceOf(CONTRACT).call();

  const pairLength = await contract.methods.pairLength().call();
  $("#pairLength").html(pairLength);
  $("#lpBalanceOfUser").html(web3.utils.fromWei(lpBalanceOfUser));
  $("#lpBalanceOfCtx").html(web3.utils.fromWei(lpBalanceOfCtx));
  pairList(pairLength);


}

async function pairList(pairLength) {
  let html = "";
  $("#PairInfo").html(html);
  for (let i = 0; i < pairLength; i++) {
    const pairAddress = await contract.methods.pairAt(i).call();

    $("#PairInfo").html(html);
    const pair = new web3.eth.Contract(pair_abi, pairAddress);

    const balance = await pair.methods.balanceOf(CONTRACT).call();
    const token0 = await pair.methods.token0().call();
    const token1 = await pair.methods.token1().call();

    const ctxToken0 = new web3.eth.Contract(erc20_abi, token0);

    const ctxToken1 = new web3.eth.Contract(erc20_abi, token1);

    const token0Symbol = await ctxToken0.methods.symbol().call();
    const token1Symbol = await ctxToken1.methods.symbol().call();

    html += `LP: ${i}: ${pairAddress} = ${balance}<br/>`;
    html += `LP Info:<br/>`;
    html += `- ${token0Symbol}: ${token0}<br/>- ${token1Symbol}: ${token1}<br/>`;

    const pairPaths = await contract.methods.pairPaths(pairAddress).call();
    html += `path:<br/>`;
    html += ` - x ${JSON.stringify(pairPaths[0])}<br/>`;
    html += ` - s ${JSON.stringify(pairPaths[1])}<hr/>`;
    $("#PairInfo").html(html);
  }
}

async function showLastCollectReward() {
  const lastBlock = await web3.eth.getBlockNumber();
  const from = lastBlock - 1024;
  contract.getPastEvents("CollectReward", { fromBlock: from, toBlock: lastBlock },
    function(err, ev) {
      console.log(err, ev);
      if (err) {
        console.error(err);
      } else {
        // console.log(ev);
        let html = "";
        for (let i in ev) {
          const e = ev[i];
          const r = e.returnValues;
          console.log("CollectReward", r);

          let reward = r.reward ? r.reward.toString() : "0";
          reward = web3.utils.fromWei(reward);
          const ttl = r.interval;
          const status = r.status ? "OK" : "ERR";
          //console.log(user, amount, status);
          html += "<li class=\"list-group-item\">" + reward + " ONE - " + toHHMMSS(ttl) + " " + status + "</li>";
        }
        $("#eventsCollectReward").html(html);
      }

    });
}

async function pairRemove() {
  // const value = web3.utils.toWei(amount);
  const pair = $("#addPair").val();
  try {
    await contract.methods.pairRemove(pair).estimateGas({ from: account },
      async function(error, gasAmount) {
        if (error) {
          alert(error.toString());
        } else {
          await contract.methods.pairRemove(pair).send({ from: account });
          await initContract();
        }
      });
  } catch (e) {
    alert(e.toString());
  }
}


async function addNewToken() {
  // const value = web3.utils.toWei(amount);
  const pair = $("#addPair").val();
  const path = $("#addPath").val().trim().split(",");
  try {
    await contract.methods.setToken(pair, path, path).estimateGas({ from: account },
      async function(error, gasAmount) {
        if (error) {
          alert(error.toString());
        } else {
          await contract.methods.setToken(pair, path, path).send({ from: account });
          await initContract();
        }
      });
  } catch (e) {
    alert(e.toString());
  }
}


async function setToken() {
  // const value = web3.utils.toWei(amount);
  const pair = $("#addPair").val();
  const path = $("#addPath").val().trim().split(",");
  try {
    await contract.methods.setToken(pair, path, path).send({ from: account });
    await initContract();
  } catch (e) {
    alert(e.toString());
  }
}


async function run() {
  try {
    await contract.methods.run().estimateGas({ from: account },
      async function(error, gasAmount) {
        if (!error) {
          await contract.methods.run().send({ from: account });
          await initContract();
        }
      });
  } catch (e) {
    alert(e.toString());
  }
}

async function addLiquidityONE() {
  const token = $("#addLiquidityONEToken").val();
  const amountTokenDesired = web3.utils.toWei($("#addLiquidityONEAmount0").val());
  const amountTokenMin = "0";
  const amountONEMin = "0";
  const ONE = web3.utils.toWei($("#addLiquidityONEAmount1").val());
  const to = account;
  const deadline = parseInt(new Date().getTime() / 1000) + 120;
  try {
    await router.methods.addLiquidityONE(
      token, amountTokenDesired, amountTokenMin,
      amountONEMin, to, deadline).estimateGas({ from: account, value: ONE },
      async function(error, gasAmount) {
        if (!error) {
          await router.methods.addLiquidityONE(token, amountTokenDesired, amountTokenMin,
            amountONEMin, to, deadline).send({ from: account, value: ONE });
          await initContract();
        }
      });
  } catch (e) {
    alert(e.toString());
  }
}


async function routerApprove() {
  const address = $('#swapPair0').val();
  const token = new web3.eth.Contract(erc20_abi, address);
  await token.methods
    .approve(router._address, web3.utils.toWei("9999999999999999999999999999999999999"))
    .send({ from: account });
  await initContract();
}

async function swapAllowance(address){
  const token = new web3.eth.Contract(erc20_abi, address);
  const swapAllowance = web3.utils.fromWei(await token.methods.allowance(account, router._address).call());
  const balanceOf = web3.utils.fromWei(await token.methods.balanceOf(account).call());
  $("#swapAllowance").html(`[Allowance: ${swapAllowance}, Balance: ${balanceOf}]`);

}

async function swapApprove() {
  const token = new web3.eth.Contract(erc20_abi,  $('#swapPair0').val() );
  await token.methods
    .approve(router._address, web3.utils.toWei("9999999999999999999999999999999999999"))
    .send({ from: account });
  await swapAllowance();
}

async function swap() {
  const swapPair0 = $("#swapPair0").val();
  const swapPair1 = $("#swapPair1").val();
  const amountIn = web3.utils.toWei($("#swapAmount").val());
  const path = [swapPair0, swapPair1];
  const to = account;
  const deadline = parseInt(new Date().getTime() / 1000) + 120;
  await router.methods
    .swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, "0", path, to, deadline)
    .send({ from: account });
  await initContract();
}
