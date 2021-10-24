import { BigNumber } from '@ethersproject/bignumber'
import axios from 'axios'
import { organizations } from '../config/config'
import { TaskStatus } from '../config/enums'
import { Task, User, OrgMetaData } from '../types'

export const getTask = async (taskId: string): Promise<Task> => {
  return {}
}

export const getDAO = async (org: { url: string }): Promise<OrgMetaData> => {
  try {
    const ipfsLink = organizations.find((o) => o.url === org.url)?.ipfs
    const { data } = await axios(ipfsLink)

    return {
      ...org,
      ...data,
      tvl: '$3.4M',
      tasks: 1201,
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const getUser = async (userId: string): Promise<User> => {
  return {
    id: userId,
    completedTasks: [],
    ipfsContract: '0xgord',
    applications: [5353536, 646464],
    xp: 126000,
    bio: `### Hey Everyone 👋

    Hi. I'm Peter Jihde, a Full-Stack developer who likes to work with Blockchain(Bitcoin, Ethereum, Solidity, Rust), JavaScript/Typescript (Preact, Next.js, Vue.js, TensorFlow.js, Node, Deno), Python among others.
    Since I've graduated the university, I’ve joined several companies and dev teams to build web and mobile apps.
    
    Nowadays I passionate about blockchain technologies so that I'm mainly focusing on the Defi development stack.
        
    - 🌱 I’m currently learning blockchain technologies
    - 🤔 I’m looking to help with buliding defi and web apps
    - 💬 Ask me about web and blockchain development
    - 📫 How to reach me: evercreativedev@gmail.com
    - 😄 Pronouns: He/His
    - ⚡ Fun fact: ...
    `,
  }
}
