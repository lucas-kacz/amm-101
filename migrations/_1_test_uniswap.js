const ExerciceSolution = artifacts.require("ExerciceSolution.sol");
const BigNumber = require('bignumber.js');
const IERC20 = artifacts.require("IERC20.sol")
const contract = require("@truffle/contract");

contract("ExerciceSolution", (accounts) => {
    const DAI = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844";
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
    const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";

    const AMOUNT_IN = web3.utils.toBN("10");
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAI;
    const TOKEN_OUT = WETH;
    const TO = accounts[0];

    it("should swap", async () =>{
        const tokenIn = await IERC20.at(TOKEN_IN);
        const tokenOut = await IERC20.at(TOKEN_OUT);
        const testUniswap = await ExerciceSolution.new();

        await tokenIn.approve(testUniswap.address, AMOUNT_IN, {from : DAI_WHALE });
        await testUniswap.swapYourTokenForEth(
            tokenIn.address,
            tokenOut.address,
            AMOUNT_IN,
            AMOUNT_OUT_MIN,
            TO,
            {
                from: DAI_WHALE,
            }
        );

        console.log(`out ${await tokenOut.balanceOf(TO)}`)
    });
});