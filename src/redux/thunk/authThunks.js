import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import authService from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Login = createAsyncThunk(
  "auth/Login",
  async (data, { rejectWithValue }) => {
    console.log("in login async thunk");
    console.log(data);

    try {
      const res = await authService.login(data);
      console.log(res);

      if (res.access_token) {
        const token = jwtDecode(res.access_token);
        const userId = token.user_id; 

        console.log("token ===", token);

        if (!token.is_verified && !token.is_admin ) {
          return rejectWithValue({ error: "User not verified", res });
        } else if (token.is_tutor && token.status === 'Pending'){
          
          return rejectWithValue({ error: "Application status is pending", res });
        }
        else if (token.is_tutor && token.status === 'Requested'){
          
          return rejectWithValue({ error: "Application status is requested", res });
        }
        else if (token.is_tutor && token.status === 'Rejected'){
          
          return rejectWithValue({ error: "Application status is rejected", res });
        }
        else {
          const { access_token, refresh_token, role, user, } = res;
          
          localStorage.setItem("access", access_token);
          localStorage.setItem("refresh", refresh_token);
          localStorage.setItem("role", role);
          localStorage.setItem("user", user);
          
          return {
            access_token,
            refresh_token,
            role,  
            id: userId,  
            user,
            profile : token.profile
          };
        }
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error) {
      console.log("login thunk error ===> ", error);

      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const Signup = createAsyncThunk(
  "auth/Signup",
  async ({ email, password, username, role }, { rejectWithValue }) => {
    try {
      const res = await authService.register(email, password, username, role);

      console.log("res from signup", res);

      return res;
    } catch (error) {
      console.log("signup thunk catch error ==>  ", error.response.data);
      console.log("signup thunk catch error ==>  ", error.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk("auth/Logout", async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    const response = await api.post("logout/", { refresh });
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    return response.data;
  } catch (error) {
    console.log("error in logout time ==== ", error);

    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    throw error;
  }
});
