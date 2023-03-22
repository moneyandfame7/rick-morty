import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore, persistReducer } from 'redux-persist'
import { rootApi } from 'application/store/root-api.slice'

import { charactersReducer } from 'features/characters/services'
import { userReducer } from 'features/users/services'

import { customizationReducer } from 'application/theme/customization'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['customization', 'credentials', 'favoriteCharacters']
}
const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  favoriteCharacters: charactersReducer,
  credentials: userReducer,
  customization: customizationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([rootApi.middleware])
})

store.subscribe(() => {
  const state = store.getState()

  // maybe це потрібно щоб працювало?
  /*const { characters } = state.favoriteCharacters*/

  /*  setLocalStorage(LocalStorageKey.FAVORITE_CHARACTERS, characters)*/
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
