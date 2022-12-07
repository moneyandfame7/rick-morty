import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEpisode } from "../../interfaces";
import { getApiResource } from "../../utils/fetch";
import { isError, isLoading } from "../selectors";

interface IEpisodeState {
  oneEpisode: string;
  loading: boolean;
  error: string | null;
}
const initialState: IEpisodeState = {
  oneEpisode: "",
  loading: false,
  error: null,
};

export const fetchEpisodeByUrl = createAsyncThunk<string, string, { rejectValue: string }>(
  "oneEpisode/fetch",
  async (url: string, { rejectWithValue }) => {
    const response = await getApiResource<IEpisode>(url);

    if (response) {
      return response.name;
    } else {
      return rejectWithValue("Failed to fetch episodes");
    }
  }
);

export const oneEpisodeSlice = createSlice({
  name: "oneEpisode",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEpisodeByUrl.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.oneEpisode = action.payload;
      })
      .addMatcher(isLoading, state => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default oneEpisodeSlice.reducer;
