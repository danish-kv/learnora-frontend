import { displayToastAlert } from "../utils/displayToastAlert";
import api from "./api";

export const register = async (email, password, username, role) => {
  try {
    const response = await api.post("register/", {
      email,
      password,
      username,
      role,
    });
    displayToastAlert(200, "User registered successfully!");
    return response.data;
  } catch (error) {
    console.error("catch error signup ===>", error);
    console.error("catch  ===>", error.response);
    // displayToastAlert(
    //   error.response.status || 400,
    //   error.response.data.email || "Facing some issue please try later"
    // );

    if (error.response && error.response.data) {
      const errorMessages = error.response.data;
      for (let key in errorMessages) {
        if (errorMessages.hasOwnProperty(key)) {
          displayToastAlert(400, `${key}: ${errorMessages[key]}`);
          console.error(`${key}: ${errorMessages[key]}`);
        }
      }
    } else {
      displayToastAlert(400, "An unexpected error occurred.");
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
        displayToastAlert(100, "Data not found given credentails");
      } else if (error.response.data) {
        const errorMess = error.response.data;
        // for (let key in errorMess) {
        //   if (errorMess.hasOwnProperty(key)) {
        //     displayToastAlert(400, `${key}: ${errorMess[key]}`);
        //     console.error(`${key}: ${errorMess[key]}`);
        //   }
        // }
      } else {
        displayToastAlert("An unexpected error occurred.");
        displayToastAlert(status, detail);
      }
    } else {
      displayToastAlert("An error occurred");
      console.error("Error: ", error);
    }
    throw error;
  }
};

export default {
  register,
  login,
};
