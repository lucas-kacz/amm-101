var MyERC20 = artifacts.require("MyERC20.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployMyERC20(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
    });
};

async function deployMyERC20(deployer, network, accounts) {
	TDToken = await MyERC20.new("LucasCoin","DMRZO",web3.utils.toBN("592961401000000000000000000"))
}

async function deployRecap(deployer, network, accounts) {
	console.log("MyERC20 " + TDToken.address)
}