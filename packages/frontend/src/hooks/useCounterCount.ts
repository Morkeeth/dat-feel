import { Counter__factory } from '../generated/types/factories/Counter__factory'
import { BigNumber } from '@ethersproject/bignumber'
import useAddress from '../web3/useAddress'
import useCall, { UseCallValue } from '../web3/useCall'

const useCounterCount = (): UseCallValue<BigNumber> => {
  const address = useAddress('Counter')

  const result = useCall<BigNumber>({
    abi: Counter__factory.createInterface(),
    address,
    method: 'getCurrentCount',
  })

  return result
}

export default useCounterCount
