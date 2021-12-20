const MyCommunity = artifacts.require('Community')
const MyRandom = artifacts.require('Random')
// const MyPet = artifacts.require('Pet')

module.exports = function (deployer) {
  deployer.deploy(MyCommunity)
  deployer.deploy(MyRandom)
  // deployer.deploy(MyPet)
}
