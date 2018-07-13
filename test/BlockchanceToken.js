var BlockchanceToken = artifacts.require("./BlockchanceToken.sol");
//import assertRevert from './helpers/assertRevert';

contract('BlockchanceToken', (accounts) => {
    var contract;
    //var owner = "0xe889a114411d22ad90D43aE49835143eE35198A5";
    var owner = accounts[0];
    var maxTotalSupply = 1e26;
    var OneToken = 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await BlockchanceToken.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], OneToken, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(OneToken, balanceAccountTwoAfter);
    });
});



