import rimraf from 'rimraf'
import { paths } from '../packages/hardhat/scripts/build-utils'

const deleteDirectory = (path: string): void => {
  rimraf(path, (e) => console.log(`Deleted: ${path}`))
}

const cleanFrontendGeneratedFiles = (): void => {
  console.log('Cleaning Frontend Generated files...')
  deleteDirectory(paths.EXPORTED_GENERATED__DIR)
}

const cleanHardHatGeneratedFiles = (): void => {
  console.log('Cleaning HardHat Generated files...')
  const hardHatRootDirPath = `${__dirname}/packages/hardhat`
  const hardHatArtifactsDirPath = `${hardHatRootDirPath}/artifacts`
  const hardHatCacheDirPath = `${hardHatRootDirPath}/cache`
  const hardHatDeploymentsDirPath = `${hardHatRootDirPath}/deployments`
  deleteDirectory(hardHatArtifactsDirPath)
  deleteDirectory(hardHatCacheDirPath)
  deleteDirectory(hardHatDeploymentsDirPath)
}

const cleanSubgraphGeneratedFiles = (): void => {
  console.log('Cleaning Subgraph Generated files...')
  const subgraphRootDirPath = `${__dirname}/packages/subgraph`
  const subgraphAbisDirPath = `${subgraphRootDirPath}/abis`
  const subgraphConfigDirPath = `${subgraphRootDirPath}/config`
  deleteDirectory(subgraphAbisDirPath)
  deleteDirectory(subgraphConfigDirPath)
}

const init = (): void => {
  cleanHardHatGeneratedFiles()
  cleanSubgraphGeneratedFiles()
  cleanFrontendGeneratedFiles()
}

init()
