import '@nomiclabs/hardhat-waffle'
import '@tenderly/hardhat-tenderly'
import '@nomiclabs/hardhat-etherscan'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import chalk from 'chalk'
import { config } from './config'
import { paths } from './scripts/build-utils'
import fs from 'fs'

// Network you want to deploy to
const defaultNetwork = config.NETWORK

const mnemonic = (): string => {
  try {
    const mnemonicPath = `${__dirname}/mnemonic.txt`
    return fs.readFileSync(mnemonicPath).toString().trim()
  } catch (e) {
    console.log(
      chalk.red(`☢️ WARNING: No mnemonic file created for a deploy account. Try `) +
        chalk.cyan(`yarn run generate`) +
        chalk.red(' and then ') +
        chalk.cyan(`yarn run account`)
    )
    process.exit(1)
  }

  return ''
}

export default {
  defaultNetwork,
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: 'http://localhost:8545',
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work) // TODO ENV
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work) // TODO ENV
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work) // TODO ENV
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work) // TODO ENV
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    smartchaintest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic() },
    },
    smartchain: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic() },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: 'PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8', // TODO ENV
  },
  typechain: {
    outDir: paths.EXPORTED_TYPECHAIN_TYPES_DIR,
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
  },
}
