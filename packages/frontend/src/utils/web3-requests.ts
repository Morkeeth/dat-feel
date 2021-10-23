import axios from 'axios'
import { organizations } from '../config/config'
import { Task, User, OrgMetaData } from '../types'

export const getTask = async (taskId: string): Promise<Task> => {
  return {
    id: taskId,
    title: 'Simple task',
    description:
      'Lorem ipsum task description **in markdown** with *italics* etc goes here divisionism maximalism romanticism kinetic art land art, romanesque socialist realism fluxus romanesque tonalism carolingian, maximalism fluxus neo-expressionism les nabis.',
    status: 'Open',
    price: 8500,
    taskValidator: 'vitalik',
    organization: 'Orakuru',
    applicants: [2432, 2343],
    xp: 200,
    createdAt: '2021-10-22',
    completedAt: '2021-11-23',
  }
}

export const getDAO = async (org: { url: strng }): Promise<OrgMetaData> => {
  try {
    const ipfsLink = organizations.find((o) => o.url === org.url)?.ipfs
    const { data } = await axios(ipfsLink)

    return {
      ...org,
      ...data,
      name: 'Olympus DAO',
    }
  } catch (e) {
    return {}
  }
}

export const getUser = async (userId: string): Promise<User> => {
  return {
    id: userId,
    ipfsContract: '0xgord',
    completedTasks: [
      {
        id: '1',
        title: 'Simple task',
        description:
          'Lorem ipsum task description goes here divisionism maximalism romanticism kinetic art land art.',
        status: 'Open',
        price: 8500,
        taskValidator: 'heaton',
        organization: 'Orakuru',
        applicants: [2432, 2343],
        xp: 200,
        createdAt: '2021-10-22',
        completedAt: '2021-11-23',
      },
      {
        id: '2',
        title: 'Pancakeswap fork',
        description:
          'Lorem ipsum task description goes here divisionism maximalism romanticism kinetic art land art.',
        status: 'Open',
        price: 4500,
        taskValidator: 'spa',
        organization: 'Sushiswap',
        applicants: [2432, 2343],
        xp: 200,
        createdAt: '2021-09-22',
        completedAt: '2021-12-10',
      },
      {
        id: '3',
        title: 'Yerbie memes',
        description:
          'Lorem ipsum task description goes here divisionism maximalism romanticism kinetic art land art.',
        status: 'Open',
        price: 6500,
        taskValidator: 'vitalik',
        organization: '0x',
        applicants: [2432, 2343],
        xp: 200,
        createdAt: '2021-12-23',
        completedAt: '2021-12-24',
      },
    ],
    applications: [5353536, 646464],
    xp: 126000,
    bio: 'Lorem ipsum bio, LFG!',
  }
}
