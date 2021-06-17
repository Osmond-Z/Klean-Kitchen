import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataResult, Result, ResultType } from "../types";





export interface AppState {
    isLoading: boolean;
    showResult: boolean;
    currentResult?: Result;
    memberId: number;
    loggedIn: boolean;
  }
const appSlice = createSlice({
     name: "axios",
      initialState 
      
    });
