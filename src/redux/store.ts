import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";
import { FAVORITE_CHARACTERS, setLocalStorage } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const { characters } = state.characters;
  console.log(characters, "SUBSCRIBE");
  setLocalStorage(FAVORITE_CHARACTERS, characters);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
