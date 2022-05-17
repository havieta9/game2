const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  
  await deployer.deploy(Token, "CryptoMon", "CYMON");

  // let tokenInstance = await Token.deloyed();
  // await tokenInstance.mint(250, 5, 5, 5, 5, 5, 5, 1);

  // let monster = await tokenInstance.getMonsterDetails(0);
  // console.log(monster);
};