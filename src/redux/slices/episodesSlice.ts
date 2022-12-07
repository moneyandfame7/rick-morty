import { IEpisode } from "../../interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeConcurrentRequest } from "../../utils/fetch";
import { isError, isLoading } from "../selectors";

interface IEpisodeState {
  fetchedEpisodes: IEpisode[];
  loading: boolean;
  error: string | null;
}
const initialState: IEpisodeState = {
  fetchedEpisodes: [],
  loading: false,
  error: null,
};

export const fetchEpisodes = createAsyncThunk<IEpisode[], string[], { rejectValue: string }>(
  "episodes/fetchAll",
  async (episodes: string[], { rejectWithValue }) => {
    const response = await makeConcurrentRequest(episodes);

    if (response) {
      return response;
    } else {
      return rejectWithValue("Failed to fetch episodes");
    }
  }
);

export const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEpisodes.fulfilled, (state, action: PayloadAction<IEpisode[]>) => {
        state.loading = false;
        state.fetchedEpisodes = action.payload;
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

export default episodesSlice.reducer;
