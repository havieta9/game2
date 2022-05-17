// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(

    ["king Gidohra", "godzilla", "king Kong" ],
    ["https://wallpapercave.com/dwp1x/wp4179620.jpg","https://i.ytimg.com/vi/5BxqahE0fu8/hqdefault.jpg","https://i.ytimg.com/vi/MkH6UAFt35Q/maxresdefault.jpg"],
    [100, 200, 300],
    [200, 100, 60],
    "Saitama",
    "https://i.pinimg.com/736x/51/3b/b7/513bb7305275cb7abba98af4b0aeb88e.jpg",
    10000,
    50 
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  
  // Get the value of the NFT's URI.
  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done!");
  
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();