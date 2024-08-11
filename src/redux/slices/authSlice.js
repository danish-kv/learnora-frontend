import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
  loginThunk,
  signupTutor,
  signupStudent,
  logout,
} from "../thunk/authThunks";

const initialState = {
  user: null,
  role: null,
  email : null,
  loading: false,
  error: null,
  is_access: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleOtpAccess: (state, action) => {
      state.is_access = action.payload;
    },
    googleSignin: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("sign up loading pending", state.loading, state.user);
      })
      .addCase(signupStudent.fulfilled, (state, action) => {
        console.log("student fullfill", action);

        state.loading = false;
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.error = null;
        console.log("sign up loading fulfilled", state.loading, state.user);
      })
      .addCase(signupStudent.rejected, (state, action) => {
        console.log("student rejected", action);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupTutor.pending, (state) => {
        state.loading = false;
        state.error = action.payload;
        console.log("sign up loading rejected", state.loading, state.user);
      })
      .addCase(signupTutor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupTutor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        console.log("loginThunk loading pending", state.loading, state.user);
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log('action payload', action.payload);
        
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.email = null;
        state.role = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleOtpAccess, googleSignin } = authSlice.actions;
export default authSlice.reducer;
