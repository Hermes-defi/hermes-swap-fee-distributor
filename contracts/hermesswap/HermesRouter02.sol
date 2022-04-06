// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

import "./libraries/HermesLibrary.sol";
import "./libraries/SafeMath.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/IHermesRouter02.sol";
import "./interfaces/IHermesFactory.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IWONE.sol";

contract HermesRouter02 is IHermesRouter02 {
    using SafeMathHermes for uint256;

    address public immutable override factory;
    address public immutable override WONE;

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "HermesRouter: EXPIRED");
        _;
    }

    constructor(address _factory, address _WONE) public {
        factory = _factory;
        WONE = _WONE;
    }

    receive() external payable {
        assert(msg.sender == WONE); // only accept ONE via fallback from the WONE contract
    }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) internal virtual returns (uint256 amountA, uint256 amountB) {
        // create the pair if it doesn't exist yet
        if (IHermesFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            IHermesFactory(factory).createPair(tokenA, tokenB);
        }
        (uint256 reserveA, uint256 reserveB) = HermesLibrary.getReserves(factory, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint256 amountBOptimal = HermesLibrary.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "HermesRouter: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint256 amountAOptimal = HermesLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, "HermesRouter: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        )
    {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = HermesLibrary.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = IHermesPair(pair).mint(to);
    }

    function addLiquidityONE(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline
    )
        external
        payable
        virtual
        override
        ensure(deadline)
        returns (
            uint256 amountToken,
            uint256 amountONE,
            uint256 liquidity
        )
    {
        (amountToken, amountONE) = _addLiquidity(
            token,
            WONE,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountONEMin
        );
        address pair = HermesLibrary.pairFor(factory, token, WONE);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWONE(WONE).deposit{value: amountONE}();
        assert(IWONE(WONE).transfer(pair, amountONE));
        liquidity = IHermesPair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountONE) TransferHelper.safeTransferONE(msg.sender, msg.value - amountONE);
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountA, uint256 amountB) {
        address pair = HermesLibrary.pairFor(factory, tokenA, tokenB);
        IHermesPair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint256 amount0, uint256 amount1) = IHermesPair(pair).burn(to);
        (address token0, ) = HermesLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, "HermesRouter: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "HermesRouter: INSUFFICIENT_B_AMOUNT");
    }

    function removeLiquidityONE(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountToken, uint256 amountONE) {
        (amountToken, amountONE) = removeLiquidity(
            token,
            WONE,
            liquidity,
            amountTokenMin,
            amountONEMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWONE(WONE).withdraw(amountONE);
        TransferHelper.safeTransferONE(to, amountONE);
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint256 amountA, uint256 amountB) {
        address pair = HermesLibrary.pairFor(factory, tokenA, tokenB);
        uint256 value = approveMax ? uint256(-1) : liquidity;
        IHermesPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }

    function removeLiquidityONEWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint256 amountToken, uint256 amountONE) {
        address pair = HermesLibrary.pairFor(factory, token, WONE);
        uint256 value = approveMax ? uint256(-1) : liquidity;
        IHermesPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountONE) = removeLiquidityONE(token, liquidity, amountTokenMin, amountONEMin, to, deadline);
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityONESupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountONE) {
        (, amountONE) = removeLiquidity(
            token,
            WONE,
            liquidity,
            amountTokenMin,
            amountONEMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20Hermes(token).balanceOf(address(this)));
        IWONE(WONE).withdraw(amountONE);
        TransferHelper.safeTransferONE(to, amountONE);
    }

    function removeLiquidityONEWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint256 amountONE) {
        address pair = HermesLibrary.pairFor(factory, token, WONE);
        uint256 value = approveMax ? uint256(-1) : liquidity;
        IHermesPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountONE = removeLiquidityONESupportingFeeOnTransferTokens(
            token,
            liquidity,
            amountTokenMin,
            amountONEMin,
            to,
            deadline
        );
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(
        uint256[] memory amounts,
        address[] memory path,
        address _to
    ) internal virtual {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = HermesLibrary.sortTokens(input, output);
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out) = input == token0
                ? (uint256(0), amountOut)
                : (amountOut, uint256(0));
            address to = i < path.length - 2 ? HermesLibrary.pairFor(factory, output, path[i + 2]) : _to;
            IHermesPair(HermesLibrary.pairFor(factory, input, output)).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = HermesLibrary.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, to);
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = HermesLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, "HermesRouter: EXCESSIVE_INPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, to);
    }

    function swapExactONEForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        require(path[0] == WONE, "HermesRouter: INVALID_PATH");
        amounts = HermesLibrary.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        IWONE(WONE).deposit{value: amounts[0]}();
        assert(IWONE(WONE).transfer(HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }

    function swapTokensForExactONE(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        require(path[path.length - 1] == WONE, "HermesRouter: INVALID_PATH");
        amounts = HermesLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, "HermesRouter: EXCESSIVE_INPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, address(this));
        IWONE(WONE).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferONE(to, amounts[amounts.length - 1]);
    }

    function swapExactTokensForONE(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        require(path[path.length - 1] == WONE, "HermesRouter: INVALID_PATH");
        amounts = HermesLibrary.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, address(this));
        IWONE(WONE).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferONE(to, amounts[amounts.length - 1]);
    }

    function swapONEForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        require(path[0] == WONE, "HermesRouter: INVALID_PATH");
        amounts = HermesLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, "HermesRouter: EXCESSIVE_INPUT_AMOUNT");
        IWONE(WONE).deposit{value: amounts[0]}();
        assert(IWONE(WONE).transfer(HermesLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferONE(msg.sender, msg.value - amounts[0]);
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = HermesLibrary.sortTokens(input, output);
            IHermesPair pair = IHermesPair(HermesLibrary.pairFor(factory, input, output));
            uint256 amountInput;
            uint256 amountOutput;
            {
                // scope to avoid stack too deep errors
                (uint256 reserve0, uint256 reserve1, ) = pair.getReserves();
                (uint256 reserveInput, uint256 reserveOutput) = input == token0
                    ? (reserve0, reserve1)
                    : (reserve1, reserve0);
                amountInput = IERC20Hermes(input).balanceOf(address(pair)).sub(reserveInput);
                amountOutput = HermesLibrary.getAmountOut(amountInput, reserveInput, reserveOutput);
            }
            (uint256 amount0Out, uint256 amount1Out) = input == token0
                ? (uint256(0), amountOutput)
                : (amountOutput, uint256(0));
            address to = i < path.length - 2 ? HermesLibrary.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amountIn);
        uint256 balanceBefore = IERC20Hermes(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20Hermes(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT"
        );
    }

    function swapExactONEForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) {
        require(path[0] == WONE, "HermesRouter: INVALID_PATH");
        uint256 amountIn = msg.value;
        IWONE(WONE).deposit{value: amountIn}();
        assert(IWONE(WONE).transfer(HermesLibrary.pairFor(factory, path[0], path[1]), amountIn));
        uint256 balanceBefore = IERC20Hermes(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20Hermes(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT"
        );
    }

    function swapExactTokensForONESupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        require(path[path.length - 1] == WONE, "HermesRouter: INVALID_PATH");
        TransferHelper.safeTransferFrom(path[0], msg.sender, HermesLibrary.pairFor(factory, path[0], path[1]), amountIn);
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint256 amountOut = IERC20Hermes(WONE).balanceOf(address(this));
        require(amountOut >= amountOutMin, "HermesRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        IWONE(WONE).withdraw(amountOut);
        TransferHelper.safeTransferONE(to, amountOut);
    }

    // **** LIBRARY FUNCTIONS ****
    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) public pure virtual override returns (uint256 amountB) {
        return HermesLibrary.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure virtual override returns (uint256 amountOut) {
        return HermesLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure virtual override returns (uint256 amountIn) {
        return HermesLibrary.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint256 amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint256[] memory amounts)
    {
        return HermesLibrary.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint256 amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint256[] memory amounts)
    {
        return HermesLibrary.getAmountsIn(factory, amountOut, path);
    }
}
