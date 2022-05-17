require('babel-register');
require('babel-polyfill');

var networkId = process.env.npm_package_config_ganache_networkId;
var gasPrice  = process.env.npm_package_config_ganache_gasPrice;
var gasLimit  = process.env.npm_package_config_ganache_gasLimit; 

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: networkId, // Any network (default: none)
     gas: gasLimit,
     gasPrice: gasPrice 
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: { 
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};