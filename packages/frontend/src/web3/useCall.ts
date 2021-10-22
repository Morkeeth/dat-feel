import { ContractCall, useContractCall } from '@usedapp/core'
import { useState } from 'react'

type Status = 'default' | 'loading' | 'error' | 'success'
export type UseCallValue<T> = {
  data: T
  status: Status
}

type Call = Omit<ContractCall, 'args'> & {
  args?: any[]
}

function useCall<T>(call: Call): UseCallValue<T> {
  const [status, setStatus] = useState<Status>('default')
  const res = useContractCall({
    ...call,
    args: call.args || [],
  })

  return {
    status,
    data: res && res[0],
  }
}

export default useCall
