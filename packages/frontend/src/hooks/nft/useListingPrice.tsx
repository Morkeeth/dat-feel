import { Counter__factory } from '../../generated/types/factories/Counter__factory'
import { BigNumber } from '@ethersproject/bignumber'
import useAddress from '../../web3/useAddress'
import useCall, { UseCallValue } from '../../web3/useCall'
import { NFTMarket__factory } from '../../generated/types/factories/NFTMarket__factory'

const useListingPrice = (): UseCallValue<BigNumber> => {
  const address = useAddress('NFTMarket')
  const result = useCall<BigNumber>({
    abi: NFTMarket__factory.createInterface(),
    address,
    method: 'getListingPrice',
  })

  return result
}

export default useListingPrice
