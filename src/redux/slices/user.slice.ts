import { User } from "../../interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { LOCALSTORAGE_USER } from "../../constants/api";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: getLocalStorage(LOCALSTORAGE_USER),
};

export const userSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      setLocalStorage(LOCALSTORAGE_USER, action.payload);
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
