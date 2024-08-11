import api from "./api";
import { toast } from "react-toastify";

export const register = async (email, password, username, role) => {
  try {
    const response = await api.post("register/", {
      email,
      password,
      username,
      role,
    });
    toast.success("User registered successfully!");
    return response.data;
  } catch (error) {
    console.error("catch error signup ===>", error);
    console.error("catch  ===>", error.response);

    if (error.response && error.response.data) {
      const errorMessages = error.response.data;
      for (let key in errorMessages) {
        if (errorMessages.hasOwnProperty(key)) {
          toast.error(`${key}: ${errorMessages[key]}`);
          console.error(`${key}: ${errorMessages[key]}`);
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log("login ===> ", email, password);

    const res = await api.post("login/token/", { email, password });
    console.log("res from login ====>", res);

    return res.data;
  } catch (error) {
    console.log("catch error in login", error);
    console.log("catch error in login", error.response);

    if (error.response) {
      if (error.response.status === 401) {
        toast.error('Incorrect email or password');
      } else if (error.response.data) {
        const errorMessages = error.response.data;
        for (let key in errorMessages) {
          if (errorMessages.hasOwnProperty(key)) {
            toast.error(`${key}: ${errorMessages[key]}`);
            console.error(`${key}: ${errorMessages[key]}`);
          }
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
    throw error.response ? error.response.data : error;
  }
};

export const logout = () => {
  localStorage.clear();
};


export const TutorSignup = (username, email, password, firstName, lastName, phone, headline, ) => {

}

export default {
  register,
  login,
  logout,
};
