import { IEpisode } from "../../interfaces";
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeConcurrentRequest } from "../../utils/fetch";
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
  "episodes/fetchEpisodes",
  async (episodes: any, { rejectWithValue }) => {
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
      .addCase(fetchEpisodes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action: PayloadAction<IEpisode[]>) => {
        state.loading = false;
        state.fetchedEpisodes = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export default episodesSlice.reducer;
