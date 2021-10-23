import { makeAutoObservable, runInAction } from 'mobx'
import { organizations } from '../config/config'
import { GovernanceProposalSource, OrgMetaData } from '../types'
import { getDAO } from '../utils/web3-requests'

type Store = {
  orgs: OrgMetaData[]
  isLoading: boolean
  fetch: () => Promise<void>
}

export const orgStore = makeAutoObservable<Store>({
  orgs: [],
  isLoading: false,
  fetch: async () => {
    runInAction(() => {
      orgStore.isLoading = true
    })
    const result = await Promise.all(organizations.map((org) => getDAO(org)))
    runInAction(() => {
      orgStore.orgs = result
      orgStore.isLoading = false
    })
  },
})
