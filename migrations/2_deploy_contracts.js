const BlockchanceToken = artifacts.require('./BlockchanceToken.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0xe889a114411d22ad90D43aE49835143eE35198A5";
    deployer.deploy(BlockchanceToken, owner);
};
