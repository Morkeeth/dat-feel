import Decimal from 'decimal.js'
import { BigNumber, ethers, FixedNumber } from 'ethers'

type FormatBigNumberOptions = {
  decimals?: number
}

export const formatBigNumber = (value: BigNumber, options?: FormatBigNumberOptions) => {
  return ethers.utils.formatUnits(value, options?.decimals || 18)
}

const formatNumber = (number: Decimal, decimals = 3) => {
  return number.toDecimalPlaces(decimals).toString()
}

export const formatNumberToDecimals = (value: number | string | FixedNumber | Decimal): string => {
  if (typeof value === 'undefined' || value === null) return ''

  const number = Decimal.isDecimal(value) ? (value as Decimal) : new Decimal(value.toString())

  return formatNumber(number)
}

export const formatAddressToShort = (
  address: string,
  options?: { start?: number; end?: number }
): string =>
  [address.slice(0, options?.start || 4), '...', address.slice(-(options?.end || 4))].join('')
