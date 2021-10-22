import * as dotenv from 'dotenv'

import { SupportedNetworks } from './constants'

dotenv.config({ path: `${__dirname}/.env` })

export const config = {
  NETWORK: (process.env.NEXT_PUBLIC_NETWORK as unknown as SupportedNetworks) ?? 'localhost', // 📡 What chain are your contracts deployed to? <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
}
