import useWeb3 from '../web3/useWeb3'

const useIsOrgOwner = (): boolean => {
  const { isConnected } = useWeb3()
  return isConnected
}

export default useIsOrgOwner
