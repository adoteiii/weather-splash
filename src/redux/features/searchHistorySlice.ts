import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistory {
  uid: string;
  timestamp: number;
  location: {
    country: string;
    localtime_epoch: number;
    localtime: string;
    lat: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  };
}
const initialState = {
  value: [] as SearchHistory[],
};
export const SearchHistory = createSlice({
  name: "SearchHistory",
  initialState,
  reducers: {
    setSearchHistory: (state, action: PayloadAction<SearchHistory[]>) => {
      return {
        value: action.payload,
      };
    },
    getSearchHistory: (state) => {
      return {
        value: state.value,
      };
    },
  },
});

export const { setSearchHistory, getSearchHistory } = SearchHistory.actions;
export default SearchHistory.reducer;
