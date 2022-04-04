pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("test", "TEST") {
        _mint(msg.sender, 999999999* 1e18);
    }

    function decimals() public view override returns(uint8) {
        return 18;
    }
}