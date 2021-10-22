import { Task, User } from '../types'

export const getTask = async (taskId: string): Promise<Task> => {
  return {
    id: taskId,
    title: 'Simple task',
    description:
      'Lorem ipsum task description goes here divisionism maximalism romanticism kinetic art land art, romanesque socialist realism fluxus romanesque tonalism carolingian, maximalism fluxus neo-expressionism les nabis.',
    status: 'Open',
    price: 8500,
    taskValidator: 'vitalik',
    organization: 'Orakuru',
    applicants: [2432, 2343],
    createdAt: '2021-10-22',
    completedAt: '2021-11-23',
  }
}

export const getUser = async (userId: string): Promise<User> => {
  return {
    id: userId,
    ipfsContract: '0xgord',
    completedTasks: [12424, 54546],
    applications: [5353536, 646464],
    xp: 1337,
  }
}
