import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from '../../features/characters/services/characters.slice'
import authReducer from '../../features/users/services/user.slice'
import { setLocalStorage } from '../../utils/localStorage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rootApi } from './root-api.slice'
import { LocalStorageKey } from '../../shared/constants/api'

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    // [authorization.reducerPath]: authorization.reducer,
    favoriteCharacters: charactersReducer,
    credentials: authReducer
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
