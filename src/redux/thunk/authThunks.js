import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import authService from "../../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("in login async thunk");
    try {
      const res = await authService.login(email, password);

      const { access, refresh, role, user } = res;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);
      localStorage.setItem("user", user);

      return res;
    } catch (error) {
      console.log("login thunk error ===> ", error);

      return rejectWithValue(error);
    }
  }
);

export const signupInstructor = createAsyncThunk(
  "auth/signupInstructor ",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const res = await authService.register(
        email,
        password,
        username,
        "instructor"
      );
      return res;
    } catch (error) {
      console.log("signup thunk catch error ==>  ", error.data);
      return rejectWithValue(error.data);
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
      console.log("signup thunk catch error ==>  ", error.data);
      return rejectWithValue(error.data);
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
    return error;
  }
});


