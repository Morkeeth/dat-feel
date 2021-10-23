import { OrgMetaData } from '../types'
import useWeb3 from '../web3/useWeb3'

const useIsOrgOwner = (org: OrgMetaData): boolean => {
  const { account } = useWeb3()

  return account === org.owner
}

export default useIsOrgOwner
