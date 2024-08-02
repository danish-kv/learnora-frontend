import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
  login,
  signupInstructor,
  signupStudent,
  logout,
} from "../thunk/authThunks";

const initialState = {
  user: localStorage.getItem("user"),
  role: localStorage.getItem("role"),
  message: null,
  loading: false,
  error: null,
  is_access: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleOtpAccess: (state, action) => {
      state.is_access == action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupStudent.pending, (state) => {
        state.loading = true;
        console.log("sign up loading pending", state.loading, state.user);
      })
      .addCase(signupStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signupStudent.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || action.payload;
      })
      .addCase(signupInstructor.pending, (state) => {
        state.loading = true;
        console.log("sign up loading pending", state.loading, state.user);
      })
      .addCase(signupInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signupInstructor.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        console.log("login loading pending", state.loading, state.user);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.message = action.payload.message || action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.message = null;
        state.loading = false

      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleOtpAccess } = authSlice.actions
export default authSlice.reducer 