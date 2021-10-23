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
    bio: 'Lorem ipsum bio, LFG!',
  }
}
