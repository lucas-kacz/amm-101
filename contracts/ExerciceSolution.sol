pragma solidity >=0.6.2;
import "./utils/IUniswapV2Factory.sol";
import "./utils/IUniswapV2Router.sol";
import "./MyERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciceSolution{

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    // address private constant MYERC20 = 0xaD7b3dC82BBf823BD90Ab8A0A6C6e2cD566AcBe3;
    address private constant PAIR = 0xCeD6525a19818992606D8B9003EB2fC538f0A64C;

    IUniswapV2Router01 public uniswap_v2_router;
    MYERC20 public myerc20;

    // function swapYourTokenForEth()
    //     address _tokenIn,
    //     address _tokenOut,
    //     uint256 _amountIn,
    //     uint256 _amountOutMin,
    //     address _to
    // )external{
    //     IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    //     IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);

    //     address[] memory path;
    //     path = new address[](3);
    //     path[0] = _tokenIn;
    //     path[1] = WETH;
    //     path[2] = _tokenOut;

    //     IUniswapV2Router01(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
    //         _amountIn, 
    //         _amountOutMin, 
    //         path, 
    //         _to, 
    //         block.timestamp);
    // }

    function swapYourTokensForETH() external {
        myerc20.approve(address(uniswap_v2_router), 0.01 ether);

        address[] memory path;
        path = new address[](2);
        path[0] = 0x2B1a884Dc7a8f0cc17939928895D9D7cb9146074;
        path[1] = WETH;

        uniswap_v2_router.swapExactTokensForTokens(
            0.01 ether, 
            10 wei, 
            path, 
            address(this), 
            block.timestamp
        );
    }
}