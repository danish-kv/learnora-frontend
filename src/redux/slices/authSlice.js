import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Signup, Logout } from "../thunk/authThunks";

const initialState = {
  user: null,
  id: null,
  role: null,
  email: null,
  profile : null,
  loading: false,
  error: null,
  otp_access: false,
  tutorApplicationAccess: false,
  tutorApplicationDoneAccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleOtpAccess: (state, action) => {
      state.otp_access = action.payload;
    },
    googleSignin: (state, action) => {
      state.user = action.payload.user;
      state.id = action.payload.id;
      state.profile = action.payload.profile;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.loading = false;
    },
    tutorApplication: (state, action) => {
      state.tutorApplicationAccess = action.payload;
    },
    tutorApplicationDone: (state, action) => {
      state.tutorApplicationDoneAccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("sign up loading pending", state.loading, state.user);
      })
      .addCase(Signup.fulfilled, (state, action) => {
        console.log("student fullfill", action);

        state.loading = false;
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.error = null;
        console.log("sign up loading fulfilled", state.loading, state.user);
      })
      .addCase(Signup.rejected, (state, action) => {
        console.log("student rejected", action);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(Login.pending, (state) => {
        state.loading = true;
        console.log("loginThunk loading pending", state.loading, state.user);
      })
      .addCase(Login.fulfilled, (state, action) => {
        console.log("action payload filfilled", action.payload);

        state.user = action.payload.user;
        state.id = action.payload.id;
        state.profile = action.payload.profile;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
        state.id = null;
        state.email = null;
        state.role = null;
        state.loading = false;
      })
      .addCase(Logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  toggleOtpAccess,
  googleSignin,
  tutorApplication,
  tutorApplicationDone,
} = authSlice.actions;
export default authSlice.reducer;
