import { displayToastAlert } from "../utils/displayToastAlert";
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
    await displayToastAlert(error.response.status || 400, error.response.data.email || 'Facing some issue please try later')

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

export const login = async ({email, password, role}) => {
  try {
    console.log("login ===> ", email, password, role);

    const res = await api.post("login/token/", { email, password, role });
    console.log("res from login ====>", res);

    return res.data;
  } catch (error) {
    console.log("catch error in login", error);
    console.log("catch error in login", error.response.data?.detail);
    displayToastAlert(400, error.response.data?.detail)

    if (error.response) {
      if (error.response.status === 401) {
        displayToastAlert(400,'Incorrect email or password');
      } else if (error.response.data) {
        const errorMess = error.response.data;
        for (let key in errorMess) {
          if (errorMess.hasOwnProperty(key)) {
            toast.error(`${key}: ${errorMess[key]}`);
            console.error(`${key}: ${errorMess[key]}`);
          }
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
    console.log('eeerrroro', error);
    
    // throw error.response ? error.response.data : error;
  }
};




export default {
  register,
  login,
};
