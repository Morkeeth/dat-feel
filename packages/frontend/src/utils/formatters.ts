import { BigNumber, ethers } from 'ethers'

type FormatBigNumberOptions = {
  decimals?: number
}

export const formatBigNumber = (value: BigNumber, options?: FormatBigNumberOptions) => {
  return ethers.utils.formatUnits(value, options?.decimals || 18)
}

export const formatAddressToShort = (
  address: string,
  options?: { start?: number; end?: number }
): string =>
  [address.slice(0, options?.start || 4), '...', address.slice(-(options?.end || 4))].join('')
