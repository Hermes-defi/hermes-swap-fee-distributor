//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";
import "./hermesswap/interfaces/IHermesRouter02.sol";
import "./hermesswap/interfaces/IHermesFactory.sol";
import "./hermesswap/interfaces/IHermesPair.sol";
import "./hermesswap/interfaces/IERC20.sol";

contract Distributor {
    mapping(address => bool) public tokenHashPath;
    mapping(address => address[]) public tokensWithPathForXHRMS;
    mapping(address => address[]) public tokensWithPathForSHRMS;
    address[] tokens;
    address public wone;
    address public ust;
    address public HRMS;
    address public treasury;
    address public router;
    address public xHRMSAddress;
    address public sHRMSAddress;
    IHermesRouter02 public routerCtx;
    IHermesFactory public factoryCtx;

    constructor(
        address _router, address _treasury,
        address _xHRMSAddress, address _sHRMSAddress,
        address _ust, address _HRMS) {
        router = _router;
        treasury = _treasury;
        xHRMSAddress = _xHRMSAddress;
        sHRMSAddress = _sHRMSAddress;

        ust = _ust;
        HRMS = _HRMS;

        routerCtx = IHermesRouter02(_router);
        factoryCtx = IHermesFactory(routerCtx.factory());
        factoryCtx.allPairsLength();

        wone = routerCtx.WONE();
    }

    function addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external {
        for (uint i = 0; i < tokens.length; i ++) {
            require(tokens[i] != _token, "Token is already registered");
        }
        tokenHashPath[_token] = true;
        tokensWithPathForXHRMS[_token] = _xHRMSPath;
        tokensWithPathForSHRMS[_token] = _sHRMSPath;
        tokens.push(_token);
    }
    function run() public {
        breakLp();
        convertAll();
        splitAndSend();
    }
    function breakLp() public {
        uint length = factoryCtx.allPairsLength();
        //console.log('length', length);
        for (uint i = 0; i < length; i ++) {
            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));
            uint balanceOfLp = pair.balanceOf(address(this));
            //console.log('pair', balanceOfLp, address(pair));
            if (balanceOfLp == 0) continue;
            IERC20Hermes token0 = IERC20Hermes(pair.token0());
            IERC20Hermes token1 = IERC20Hermes(pair.token1());
            pair.approve(address(routerCtx), balanceOfLp);
            routerCtx.removeLiquidity(pair.token1(), pair.token0(), balanceOfLp,
                0, 0, address(this), block.timestamp + 60);
            uint balance0 = token0.balanceOf(address(this));
            uint balance1 = token1.balanceOf(address(this));
            (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = pair.getReserves();
//            console.log(' token0', address(token0), balance0);
//            console.log('  reserve0', reserve0);
//            console.log(' token1', address(token1), balance1);
//            console.log('  reserve1', reserve1);
        }
    }

    function convertAll() public {
        uint length = factoryCtx.allPairsLength();
        for (uint i = 0; i < length; i ++) {
            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));
            IERC20Hermes token0 = IERC20Hermes(pair.token0());
            IERC20Hermes token1 = IERC20Hermes(pair.token1());
            uint balance0 = token0.balanceOf(address(this));
            uint balance1 = token1.balanceOf(address(this));
            (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = pair.getReserves();
//            console.log('----------------------------------------------------------------------');
//            console.log(' l/token0', address(token0), balance0);
//            console.log('  l/reserve0', reserve0);
//            console.log(' l/token1', address(token1), balance1);
//            console.log('  l/reserve1', reserve1);
            convert(token0);
            convert(token1);
        }
    }

    function convert(IERC20Hermes token) public {

        address tokenAddress = address(token);
        if (tokenAddress == wone) {
            //console.log('  // is wone token', token.symbol());
            // no need to apply conversion for fee token
            return;
        }
        if (!tokenHashPath[tokenAddress]) {
            // token has not path
            //console.log('  // token has not path', token.symbol());
            return;
        }

        uint balanceOfToken = token.balanceOf(address(this));
        if (balanceOfToken < 1 * 10 ** (token.decimals())) {
            // insufficient balance
            //console.log('  // insufficient balance', token.symbol());
            return;
        }


        //
        IERC20Hermes(tokensWithPathForXHRMS[tokenAddress][0])
        .approve(address(routerCtx), balanceOfToken);

        routerCtx.swapExactTokensForTokens(
            balanceOfToken,
            0,
            tokensWithPathForXHRMS[tokenAddress],
            address(this),
            block.timestamp + 10000
        );
        //console.log(' OK, swaped', tokenAddress);
    }

    function splitAndSend() public {
        IERC20Hermes token = IERC20Hermes(wone);

        uint treasureBalance = token.balanceOf(address(this))/2;
        uint xHRMSBalance = token.balanceOf(address(this))/4;
        uint sHRMSBalance = token.balanceOf(address(this))/4;
        //console.log('balances', treasureBalance, xHRMSBalance, sHRMSBalance);

        token.transfer(treasury, treasureBalance);

        address[] memory path1 = new address[](2);
        path1[0] = wone;
        path1[1] = ust;
        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);
        uint256[] memory amountsShrms = routerCtx.swapExactTokensForTokens(
            sHRMSBalance, 0, path1, sHRMSAddress, block.timestamp + 10000
        );
//        for( uint i = 0 ; i < amountsShrms.length ; i ++ ){
//            console.log('- amountsShrms', amountsShrms[i]);
//        }

        address[] memory path2 = new address[](2);
        path2[0] = wone;
        path2[1] = HRMS;
        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);
        uint256[] memory amountsXhrms = routerCtx.swapExactTokensForTokens(
            sHRMSBalance, 0, path2, xHRMSAddress, block.timestamp + 10000
        );
//        for( uint i = 0 ; i < amountsXhrms.length ; i ++ ){
//            console.log('- amountsXhrms', amountsXhrms[i]);
//        }

    }

}
