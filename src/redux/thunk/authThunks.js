import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import authService from "../../services/authService";

export const  loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("in login async thunk");
    console.log(email, password);
    
    try {
      const res = await authService.login(email, password);

      const { access_token, refresh_token, role, username } = res;
      console.log(res);
      console.log(res.username);
      console.log(res.access_token);
      console.log(res.refresh_token);
      console.log(res.role);
      

      localStorage.setItem("access", access_token);
      localStorage.setItem("refresh", refresh_token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", username);

      return res;
    } catch (error) {
      console.log("login thunk error ===> ", error);

      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const signupTutor = createAsyncThunk(
  "auth/signupTutor ",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const res = await authService.register(
        email,
        password,
        username,
        "tutor"
      );
      return res;
    } catch (error) {
      console.log("signup thunk catch error ==>  ", error.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupStudent = createAsyncThunk(
  "auth/signupStudent ",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const res = await authService.register(
        email,
        password,
        username,
        "student"
      );
      return res;
    } catch (error) {
      console.log("signup thunk catch error ==>  ", error.response.data);
      console.log("signup thunk catch error ==>  ", error.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    const response = await api.post("logout/", { refresh });
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    return response.data;
  } catch (error) {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    throw error;
  }
});


