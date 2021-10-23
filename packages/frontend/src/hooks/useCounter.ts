import Decimal from 'decimal.js'
import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import usePrevious from './usePrevious'

type Options = {
  value: number | string
  decimals?: number
  onUpdate: (value: any) => void
}

const useCounter = ({ value, decimals, onUpdate }: Options) => {
  const prevValue = usePrevious(value || 0) || 0
  const from = new Decimal(prevValue).toNumber()
  const to = new Decimal(value).toNumber()

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      onUpdate,
    })

    return () => controls.stop()
  }, [from, to])
}

export default useCounter
