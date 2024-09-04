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

export const login = async ({ email, password, role }) => {
  try {
    console.log("login ===> ", email, password, role);

    const res = await api.post("login/token/", { email, password, role });
    console.log("res from login ====>", res);

    return res.data;
  } catch (error) {
    console.log("catch error in login", error);

    if (error.response) {
      const status = error.response.status;
      const detail = error.response.data?.detail;

      if (status === 401) {
        await swal(
          "Wrong credentails",
          "Data not found given credentails.",
          "info"
        );
      } else if (error.response.data) {
        const errorMess = error.response.data;
        for (let key in errorMess) {
          if (errorMess.hasOwnProperty(key)) {
            toast.error(`${key}: ${errorMess[key]}`);
            console.error(`${key}: ${errorMess[key]}`);
          }
        }
      } else {
        displayToastAlert('An unexpected error occurred.');
        displayToastAlert(status, detail )
      }
    } else {
      displayToastAlert('An error occurred');
      console.error('Error: ', error);
    }
    throw error;
  }
};





export default {
  register,
  login,
};
