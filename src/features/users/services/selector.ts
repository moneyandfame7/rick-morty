import { RootState } from 'application/store'

import { IUser } from 'features/users/type'

export const selectCurrentUser = (state: RootState): IUser | null => state.credentials.user
