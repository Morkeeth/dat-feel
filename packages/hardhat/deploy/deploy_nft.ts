import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import chalk from 'chalk'

const name = 'NFT'

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const nftMarket = await deployments.get('NFTMarket')
  const deployResult = await deploy(name, {
    from: deployer,
    args: [nftMarket.address],
  })

  deployments.log(' 📄', chalk.cyan(name), 'deployed to:', chalk.magenta(deployResult.address))
}

export default func

func.tags = [name]
func.dependencies = ['NFTMarket']
