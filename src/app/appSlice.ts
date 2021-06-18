import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../types";

export interface AppState {
  isLoading: boolean;
  showResult: boolean;
  currentResult?: Result;
}

let initialState: AppState = {
  isLoading: false,
  showResult: false,
};

function hideResultMessage(state: AppState) {
  state.showResult = false;
}

const appSlice = createSlice({
  name: "axios",
  initialState,
  reducers: {
    startLoading(state: AppState) {
      state.isLoading = true;
    },

    finishLoading(state: AppState) {
      state.isLoading = false;
    },

    hideNotification: hideResultMessage,

    setCurrentResult(state: AppState, action: PayloadAction<Result>) {
      state.showResult = action.payload.showMessage;
      state.currentResult = action.payload;
    },
  },
});

export const {
  startLoading,
  finishLoading,
  hideNotification,
  setCurrentResult,
} = appSlice.actions;

export default appSlice.reducer;
