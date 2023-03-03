import { RootState } from '../../../application/store'

export const selectIsAuthenticated = (state: RootState): boolean => !!state.credentials.user
export const selectHasPassedWelcome = (state: RootState): boolean => !!state.credentials.user?.username
