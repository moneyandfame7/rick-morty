import { type RootState } from './store'

export const selectIsSomethingLoading = (state: RootState) =>
  Object.values(state.api.queries).some(query => query?.status === 'pending')
