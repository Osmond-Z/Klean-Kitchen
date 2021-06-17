import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../api/myAccount";
import { register } from "../serviceWorker";
import { DataResult, Result, ResultType } from "../types";
import { AppThunk } from "./store";

export interface AppState {
  isLoading: boolean;
  showResult: boolean;
  currentResult?: Result;
  memberId: number;
  loggedIn: boolean;
}

export interface UserLoginState {
  memberId: number;
}

export interface LoginParam {
  rememberMe: boolean;
  result: Result;
}
export interface RegisterParam {
  rememberMe: boolean;
  result: Result;
}

const getCachedMemberId = () =>
  parseInt(
    sessionStorage.getItem("memberId") ||
      localStorage.getItem("memberId") ||
      "0"
  );

let initialState: AppState = {
  isLoading: false,
  showResult: false,
  memberId: getCachedMemberId(),
  loggedIn: getCachedMemberId() > 0 ? true : false,
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

    showError(state: AppState, action: PayloadAction<string>) {
      state.showResult = true;
      state.currentResult = {
        type: ResultType.error,
        message: action.payload,
        showMessage: true,
      };
    },
    completeLogin(state: AppState, action: PayloadAction<LoginParam>) {
      const result = action.payload.result;
      if (result.type === ResultType.success) {
        state.loggedIn = true;
        state.memberId = (result as DataResult<number>).data;
        sessionStorage.setItem("memberId", state.memberId.toString());
        if (action.payload.rememberMe) {
          localStorage.setItem("memberId", state.memberId.toString());
        }
      } else {
        state.showResult = true;
        state.currentResult = {
          type: ResultType.error,
          message: result.message,
          showMessage: true,
        };
      }
    },
    completeRegister(state: AppState, action: PayloadAction<RegisterParam>) {
      const result = action.payload.result;
      if (result.type === ResultType.success) {
        state.loggedIn = true;
        state.memberId = (result as DataResult<number>).data;
        sessionStorage.setItem("memberId", state.memberId.toString());
        if (action.payload.rememberMe) {
          localStorage.setItem("memberId", state.memberId.toString());
        }
      } else {
        state.showResult = true;
        state.currentResult = {
          type: ResultType.error,
          message: result.message,
          showMessage: true,
        };
      }
    },
  },
});

export const {
  startLoading,
  finishLoading,
  hideNotification,
  setCurrentResult,
  completeLogin,
  showError,
} = appSlice.actions;

export default appSlice.reducer;

export const userLogin = (
  email: string,
  password: string,
  rememberMe: boolean
): AppThunk => async (dispatch) => {
  try {
    const result = await login(email, password);
    dispatch(completeLogin({ rememberMe, result }));
  } catch (err) {}
};
// export const userRegister = (
//   email: string,
//   password: string,
//   rememberMe: boolean
// ): AppThunk => async (dispatch) => {
//   try {
//     const result = await register(email, password);
//     dispatch(completeRegister({ rememberMe, result }));
//   } catch (err) {}
// };
