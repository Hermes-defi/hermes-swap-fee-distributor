//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./interfaces/IUniswapV2Router01.sol";

contract Distributor is Ownable {
    mapping(address => address[]) public tokensWithPathForXHRMS;
    mapping(address => address[]) public tokensWithPathForSHRMS;
    address[] tokens;
    address public treasury;
    address public immutable vyperRouter;
    address public immutable xHRMSAddress;
    address public immutable sHRMSAddress;
    event AddNewToken(address token, address[] xHRMSPath, address[] sHRMSPath);
    event Convert(uint amount);

    constructor(address _vyperRouter, address _treasury, address _xHRMSAddress, address _sHRMSAddress) {
        vyperRouter = _vyperRouter;
        treasury = _treasury;
        xHRMSAddress = _xHRMSAddress;
        sHRMSAddress = _sHRMSAddress;
    }

    function addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external {
        for (uint i = 0; i < tokens.length; i ++) {
            require(tokens[i] != _token, "Token is already registered");
        }
        tokensWithPathForXHRMS[_token] = _xHRMSPath;
        tokensWithPathForSHRMS[_token] = _sHRMSPath;
        tokens.push(_token);
        emit AddNewToken(_token, _xHRMSPath, _sHRMSPath);
    }

    function convert() external {
        for (uint i = 0; i < tokens.length; i ++) {
            uint balanceOfToken = ERC20(tokens[i]).balanceOf(address(this));
            if (balanceOfToken > 100 * 10**(ERC20(tokens[i]).decimals())) {
                // transfer 50% to treasury
                ERC20(tokens[i]).approve(vyperRouter, balanceOfToken);
                uint treasuryAmount = balanceOfToken / 2;
                IERC20(tokens[i]).transfer(treasury, treasuryAmount);
                // swap 25% to xHRMS
                uint xHRMSAmount = (balanceOfToken - treasuryAmount) / 2;
                IUniswapV2Router01(vyperRouter).swapExactTokensForTokens(
                    xHRMSAmount,
                    0,
                    tokensWithPathForXHRMS[tokens[i]],
                    xHRMSAddress,
                    block.timestamp + 10000
                );

                // swap 25% of sHRMS
                uint sHRMSAmount = balanceOfToken - treasuryAmount - xHRMSAmount;
                IUniswapV2Router01(vyperRouter).swapExactTokensForTokens(
                    sHRMSAmount,
                    0,
                    tokensWithPathForXHRMS[tokens[i]],
                    sHRMSAddress,
                    block.timestamp + 10000
                );
                emit Convert(balanceOfToken);
            }
        }
    }
}
