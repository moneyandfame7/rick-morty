import { RootState } from 'application/store'

import { User } from 'features/users/type'

export const selectCurrentUser = (state: RootState): User | null => state.credentials.user
