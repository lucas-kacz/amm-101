var ExerciceSolution = artifacts.require("ExerciceSolution.sol");

const Str = require('@supercharge/strings')
const BigNumber = require('bignumber.js');
const { createPath } = require('react-router-dom');
var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var MyERC20 = artifacts.require("MyERC20.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // await deployExerciceSolution(deployer, network, accounts); 
        await deployTDToken(deployer, network, accounts);
        await deployMyERC20(deployer, network, accounts);
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
        await testSolution(deployer, network, accounts)
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
}

async function deployMyERC20(deployer, network, accounts) {
	MYERC20 = await MyERC20.new("LucasCoin","DMRZO",web3.utils.toBN("592961401000000000000000000"))
}

// async function deployExerciceSolution(deployer, network, accounts) {
// 	TDToken = await ExerciceSolution.new()
// }

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
}

// async function deployRecap(deployer, network, accounts) {
// 	console.log("ExerciceSolution " + TDToken.address)
// }

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function testSolution(deployer, network, accounts){
    mySolution = await ExerciceSolution.new("0xaD7b3dC82BBf823BD90Ab8A0A6C6e2cD566AcBe3", "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f")
    console.log("my solution " + mySolution.address)
    await Evaluator.submitExercice(mySolution.address)
    console.log("submitted succesfully")
    await Evaluator.ex8_contractCanSwapVsEth()
    console.log("went well")
}