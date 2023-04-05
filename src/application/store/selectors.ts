import { RootState } from './store'

 const selectIsSomethingLoading = (state: RootState) =>
  Object.values(state.api.queries).some(query => query?.status === 'pending')