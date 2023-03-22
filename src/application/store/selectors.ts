import { useAppSelector } from './hooks'

export const useIsSomethingLoading = () => {
  return useAppSelector(state => Object.values(state.api.queries).some(query => query?.status === 'pending'))
}
