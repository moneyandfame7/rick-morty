import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store/root-api.slice'

import { charactersReducer } from 'features/characters/services'
import { userReducer } from 'features/users/services'

import { setLocalStorage } from 'shared/utils'
import { LocalStorageKey } from 'shared/constants'

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    favoriteCharacters: charactersReducer,
    credentials: userReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([rootApi.middleware])
})
store.subscribe(() => {
  const state = store.getState()
  const { characters } = state.favoriteCharacters
  setLocalStorage(LocalStorageKey.FAVORITE_CHARACTERS, characters)
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
