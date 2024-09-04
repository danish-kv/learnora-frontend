

export const validateRegistration = ({ username, email, password }) => {
    let errors = {};
    let isValid = true;
  
    if (username.trim() === "") {
      errors["username"] = "Username is required";
      isValid = false;
    }
  
    if (email.trim() === "") {
      errors["email"] = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors["email"] = "Email is invalid";
      isValid = false;
    }
  
    if (password.trim() === "") {
      errors["password"] = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors["password"] = "Password must be at least 6 characters";
      isValid = false;
    }
  
    return { isValid, errors };
  };
  






export const validateLogin = ({ email, password }) => {
  let errors = {};
  let isValid = true;

  if (email.trim() === "") {
    errors["email"] = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors["email"] = "Email is invalid";
    isValid = false;
  }

  if (password.trim() === "") {
    errors["password"] = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    errors["password"] = "Password must be at least 6 characters";
    isValid = false;
  }

  return { isValid, errors };
};
