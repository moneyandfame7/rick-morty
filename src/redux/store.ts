import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/characters.slice";
import authReducer from "./slices/user.slice";
import { FAVORITE_CHARACTERS, setLocalStorage } from "../utils/localStorage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./services/base";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // [authorization.reducerPath]: authorization.reducer,
    favoriteCharacters: charactersReducer,
    credentials: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([baseApi.middleware]),
});
store.subscribe(() => {
  const state = store.getState();
  const { characters } = state.favoriteCharacters;
  setLocalStorage(FAVORITE_CHARACTERS, characters);
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
