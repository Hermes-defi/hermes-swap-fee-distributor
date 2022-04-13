// import "hardhat/console.sol";
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

library EnumerableSet {
    // To implement this library for multiple types with as little code
    // repetition as possible, we write it in terms of a generic Set type with
    // bytes32 values.
    // The Set implementation uses private functions, and user-facing
    // implementations (such as AddressSet) are just wrappers around the
    // underlying Set.
    // This means that we can only create new EnumerableSets for types that fit
    // in bytes32.

    struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping(bytes32 => uint256) _indexes;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) {// Equivalent to contains(set, value)
            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
            // the array, and then remove the last element (sometimes called as 'swap and pop').
            // This modifies the order of the array, as noted in {at}.

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];

            // Move the last value to the index where the value to delete is
            set._values[toDeleteIndex] = lastvalue;
            // Update the index for the moved value
            set._indexes[lastvalue] = toDeleteIndex + 1;
            // All indexes are 1-based

            // Delete the slot where the moved value was stored
            set._values.pop();

            // Delete the index for the deleted slot
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function _contains(Set storage set, bytes32 value) private view returns (bool) {
        return set._indexes[value] != 0;
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    // Bytes32Set

    struct Bytes32Set {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _add(set._inner, value);
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _remove(set._inner, value);
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(Bytes32Set storage set, bytes32 value) internal view returns (bool) {
        return _contains(set._inner, value);
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(Bytes32Set storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(Bytes32Set storage set, uint256 index) internal view returns (bytes32) {
        return _at(set._inner, index);
    }

    // AddressSet

    struct AddressSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressSet storage set, address value) internal returns (bool) {
        return _add(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(AddressSet storage set, address value) internal returns (bool) {
        return _remove(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return _contains(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(AddressSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        return address(uint160(uint256(_at(set._inner, index))));
    }


    // UintSet

    struct UintSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(UintSet storage set, uint256 value) internal returns (bool) {
        return _add(set._inner, bytes32(value));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(UintSet storage set, uint256 value) internal returns (bool) {
        return _remove(set._inner, bytes32(value));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(UintSet storage set, uint256 value) internal view returns (bool) {
        return _contains(set._inner, bytes32(value));
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function length(UintSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(UintSet storage set, uint256 index) internal view returns (uint256) {
        return uint256(_at(set._inner, index));
    }
}

// File: contracts\hermesswap\interfaces\IHermesRouter01.sol



pragma solidity ^0.8.0;

interface IHermesRouter01 {
    function factory() external pure returns (address);

    function WONE() external pure returns (address);

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
    returns (
        uint256 amountA,
        uint256 amountB,
        uint256 liquidity
    );

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
    returns (
        uint256 amountToken,
        uint256 amountONE,
        uint256 liquidity
    );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityONE(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountONE);

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
    ) external returns (uint256 amountA, uint256 amountB);

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
    ) external returns (uint256 amountToken, uint256 amountONE);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactONEForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactONE(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForONE(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapONEForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path) external view returns (uint256[] memory amounts);
}

// File: contracts\hermesswap\interfaces\IHermesRouter02.sol






interface IHermesRouter02 is IHermesRouter01 {
    function removeLiquidityONESupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountONEMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountONE);

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
    ) external returns (uint256 amountONE);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactONEForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForONESupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

// File: contracts\hermesswap\interfaces\IHermesFactory.sol





interface IHermesFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function migrator() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;

    function setMigrator(address) external;
}

// File: contracts\hermesswap\interfaces\IHermesPair.sol





interface IHermesPair {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
    external
    view
    returns (
        uint112 reserve0,
        uint112 reserve1,
        uint32 blockTimestampLast
    );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

// File: contracts\hermesswap\interfaces\IERC20.sol





interface IERC20Hermes {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}



contract Distributor is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    mapping(address => address[]) public tokensWithPathForXHRMS;
    mapping(address => address[]) public tokensWithPathForSHRMS;
    address public wone;
    address public ust;
    address public HRMS;
    address public treasury;
    address public router;
    address public xHRMSAddress;
    address public sHRMSAddress;
    IHermesRouter02 public routerCtx;
    IHermesFactory public factoryCtx;
    EnumerableSet.AddressSet private allTokens;

    constructor(
        address _router,
        address _treasury,
        address _xHRMSAddress,
        address _sHRMSAddress,
        address _ust,
        address _HRMS)
    {
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
    function pairLength() public view returns(uint){
        return allTokens.length();
    }
    function pairAt(uint i) public view returns(address){
        return allTokens.at(i);
    }
    function pairContains(address pair) public view returns(bool){
        return allTokens.contains(pair);
    }
    function pairRemove(address pair) public onlyOwner {
        allTokens.remove(pair);
    }
    function pairPaths(address pair) public view returns(address[] memory, address[] memory) {
        return( tokensWithPathForXHRMS[pair], tokensWithPathForSHRMS[pair] );
    }
    function addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {
        require(allTokens.contains(_token)==false  , "Token is already registered");
        _addNewToken(_token, _xHRMSPath, _sHRMSPath);
    }
    function setToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {
        _addNewToken(_token, _xHRMSPath, _sHRMSPath);
    }
    function _addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) internal {
        for (uint i = 0; i < _xHRMSPath.length; i ++) {
            IERC20Hermes(_xHRMSPath[i]).balanceOf(address(this));
        }
        for (uint i = 0; i < _sHRMSPath.length; i ++) {
            IERC20Hermes(_sHRMSPath[i]).balanceOf(address(this));
        }
        IHermesPair(_token).token0();
        allTokens.add(_token);
        tokensWithPathForXHRMS[_token] = _xHRMSPath;
        tokensWithPathForSHRMS[_token] = _sHRMSPath;

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
        if ( allTokens.contains(tokenAddress) == false ) {
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
