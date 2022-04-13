const CONTRACT = '0xDa786eF0b46C0CE6d667E5a068D1E8b1E0490b25'
let web3, account, contract;
async function accountLoad() {
    if (window.ethereum) {
        const r = await window.ethereum.request({method: 'eth_requestAccounts'});
        web3 = new Web3(window.ethereum);
        account = r[0];
        return true;
    }
    return false;
}

async function main(){
    const enabled = await accountLoad();
    if( enabled ){
        $('#account').val(account);
        initContract();
    }else{
        $('#ethEnabled').html('no')
    }
}
async function initContract(){
    contract = new web3.eth.Contract(abi, CONTRACT );
    const blockNumber = await web3.eth.getBlockNumber();
    $('#blockNumber').html('Block: '+blockNumber);
    $('#ACCOUNT').html(account);
    $('#router').html( await contract.methods.router().call() );
    $('#treasury').html( await contract.methods.treasury().call() );
    $('#xHRMSAddress').html( await contract.methods.xHRMSAddress().call() );
    $('#sHRMSAddress').html( await contract.methods.sHRMSAddress().call() );
    $('#ust').html( await contract.methods.ust().call() );
    $('#HRMS').html( await contract.methods.HRMS().call() );
    $('#wone').html( await contract.methods.wone().call() );

    const pairLength = await contract.methods.pairLength().call();
    $('#pairLength').html( pairLength );
    pairList( pairLength );


}

async function pairList(pairLength){
    let html = '';
    $('#PairInfo').html(html);
    for( let i = 0 ; i < pairLength ; i ++ ){
        const pairAddress = await contract.methods.pairAt(i).call();

        $('#PairInfo').html(html);
        const pair = new web3.eth.Contract(pair_abi, pairAddress );;
        const balance = await pair.methods.balanceOf(CONTRACT).call();
        const token0 = await pair.methods.token0().call();
        const token1 = await pair.methods.token1().call();

        const ctxToken0 = new web3.eth.Contract(erc20_abi, token0 );;
        const ctxToken1 = new web3.eth.Contract(erc20_abi, token1 );;

        const token0Symbol = await ctxToken0.methods.symbol().call();
        const token1Symbol = await ctxToken1.methods.symbol().call();

        html += `LP: ${i}: ${pairAddress} = ${balance}<br/>`
        html += `LP Info:<br/>`
        html += `- ${token0Symbol}: ${token0}<br/>- ${token1Symbol}: ${token1}<br/>`

        const pairPaths = await contract.methods.pairPaths(pairAddress).call();
        html += `path:<br/>`
        html += ` - x ${JSON.stringify(pairPaths[0])}<br/>`
        html += ` - s ${JSON.stringify(pairPaths[1])}<hr/>`
        $('#PairInfo').html(html);
    }
}

async function showLastCollectReward(){
    const lastBlock = await web3.eth.getBlockNumber();
    const from = lastBlock - 1024;
    contract.getPastEvents('CollectReward', {fromBlock: from, toBlock: lastBlock},
        function(err, ev){
            console.log(err, ev);
            if(err){
                console.error(err);
            }else{
                // console.log(ev);
                let html = '';
                for( let i in ev ){
                    const e = ev[i];
                    const r = e.returnValues;
                    console.log('CollectReward', r);

                    let reward = r.reward ? r.reward.toString() : '0';
                        reward = web3.utils.fromWei(reward);
                    const ttl = r.interval;
                    const status = r.status ? 'OK' : 'ERR';
                    //console.log(user, amount, status);
                    html += '<li class="list-group-item">'+reward+' ONE - '+toHHMMSS(ttl)+' '+status+'</li>'
                }
                $('#eventsCollectReward').html(html);
            }

        });
}

async function pairRemove(){
    // const value = web3.utils.toWei(amount);
    const pair = $('#addPair').val();
    try {
        await contract.methods.pairRemove(pair).estimateGas({from: account},
            async function(error, gasAmount){
                if( error ){
                    alert( error.toString() );
                }else{
                    await contract.methods.pairRemove(pair).send({from: account});
                    await initContract();
                }
            });
    } catch (e) {
        alert(e.toString());
    }
}


async function addNewToken(){
    // const value = web3.utils.toWei(amount);
    const pair = $('#addPair').val();
    const path = $('#addPath').val().trim().split(',');
    try {
        await contract.methods.setToken(pair, path, path).estimateGas({from: account},
            async function(error, gasAmount){
                if( error ){
                    alert( error.toString() );
                }else{
                    await contract.methods.setToken(pair, path, path).send({from: account});
                    await initContract();
                }
            });
    } catch (e) {
        alert(e.toString());
    }
}


async function setToken(){
    // const value = web3.utils.toWei(amount);
    const pair = $('#addPair').val();
    const path = $('#addPath').val().trim().split(',');
    try {
        await contract.methods.setToken(pair, path, path).send({from: account});
        await initContract();
    } catch (e) {
        alert(e.toString());
    }
}



async function run(){
    try {
        await contract.methods.run().estimateGas({from: account},
          async function(error, gasAmount){
              if( ! error ){
                  await contract.methods.run().send({from: account});
                  await initContract();
              }
          });
    } catch (e) {
        alert(e.toString());
    }
}
