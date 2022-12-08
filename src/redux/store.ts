import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";
import { FAVORITE_CHARACTERS, setLocalStorage } from "../utils/localStorage";
import { apiSlice } from "./slices/rickMortyApiSlice";

export const store = configureStore({
  reducer: {
    favoriteCharacters: charactersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  const { characters } = state.favoriteCharacters;
  setLocalStorage(FAVORITE_CHARACTERS, characters);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
