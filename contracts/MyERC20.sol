pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MYERC20 is ERC20{

    constructor(string memory name_, string memory symbol_, uint256 initialSupply_) public ERC20(name_, symbol_) {
        _mint(msg.sender, 592961401000000000000000000);
    }
}