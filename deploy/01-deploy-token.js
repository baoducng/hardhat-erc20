const { network } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../helper-hardhat-config");
const { verify } = require("../helper-functions");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  //how do I deploy on goerli
  /*
  differientate between environments
  */
  //how to I verify after I deploy it on goerli (auto verify)
  const ourToken = await deploy("OurToken", {
    from: deployer,
    gasLimit: 4000000,
    args: [INITIAL_SUPPLY],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(`Contract successfully deployed at ${ourToken.address}`);

  if (!developmentChains.includes(network.name)) {
    await verify("contracts/OurToken.sol:OurToken", ourToken.address, [
      INITIAL_SUPPLY,
    ]);
  }
};

module.exports.tags = ["all"];
