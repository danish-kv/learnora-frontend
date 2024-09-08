import { displayToastAlert } from "./displayToastAlert";


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









export const validateTutorApplication = ({
  firstName,
  lastName,
  public_name,
  email,
  phone,
  dateOfBirth,
  headline,
  bio,
  skills,
  cv,
  experiences,
  education,
  profilePhoto,
}) => {
  let errors = {};
  let isValid = true;

  // Validate first name
  if (firstName.trim() === "") {
    errors["firstName"] = "First name is required";
    isValid = false;
  }

  // Validate last name
  if (lastName.trim() === "") {
    errors["lastName"] = "Last name is required";
    isValid = false;
  }

  // Validate public name
  if (public_name.trim() === "") {
    errors["public_name"] = "Public name is required";
    isValid = false;
  }

  // Validate email
  // if (email.trim() === "") {
  //   errors["email"] = "Email is required";
  //   isValid = false;
  // } else if (!/\S+@\S+\.\S+/.test(email)) {
  //   errors["email"] = "Email is invalid";
  //   isValid = false;
  // }

  // Validate phone number
  if (phone.trim() === "") {
    errors["phone"] = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    errors["phone"] = "Phone number is invalid";
    isValid = false;
  }

  // Validate date of birth
  if (dateOfBirth.trim() === "") {
    errors["dateOfBirth"] = "Date of birth is required";
    isValid = false;
  }

  // Validate headline
  if (headline.trim() === "") {
    errors["headline"] = "Headline is required";
    isValid = false;
  }

  // Validate bio
  if (bio.trim() === "") {
    errors["bio"] = "Bio is required";
    isValid = false;
  }

  // Validate skills
  if (skills.trim() === "") {
    errors["skills"] = "Skills are required";
    isValid = false;
  }

  // Validate CV file
  if (!cv) {
    errors["cv"] = "CV upload is required";
    isValid = false;
  } else {
    const allowedFile = ["pdf", "doc", "docx"];
    const fileExtension = cv.name.split(".").pop().toLowerCase();
    if (!allowedFile.includes(fileExtension)) {
      errors["cv"] =
        "Invalid file type. Only PDF, DOC, and DOCX file are allowed";
      isValid = false;
    }
  }

  // Validate experiences
  if (experiences.length === 0) {
    errors["experiences"] = "At least one experience is required";
    isValid = false;
  } else {
    experiences.forEach((exp, index) => {
      if (!exp.workplace.trim()) {
        errors[`experiences[${index}].workplace`] = "Workplace is required";
        isValid = false;
      }
      if (!exp.position.trim()) {
        errors[`experiences[${index}].position`] = "Position is required";
        isValid = false;
      }
      if (!exp.startDate) {
        errors[`experiences[${index}].startDate`] = "Start date is required";
        isValid = false;
      }
      if (exp.endDate && new Date(exp.endDate) < new Date(exp.startDate)) {
        errors[`experiences[${index}].endDate`] = "End date cannot be before start date";
        isValid = false;
      }
    });
  }

  // Validate education
  if (education.length === 0) {
    errors["education"] = "At least one education entry is required";
    isValid = false;
  } else {
    education.forEach((edu, index) => {
      if (!edu.highestQualification.trim()) {
        errors[`education[${index}].highestQualification`] = "Highest qualification is required";
        isValid = false;
      }
      if (!edu.institute.trim()) {
        errors[`education[${index}].institute`] = "Institute is required";
        isValid = false;
      }
      if (!edu.year) {
        errors[`education[${index}].year`] = "Year is required";
        isValid = false;
      }
    });
  }

  // Validate profile photo
  if (!profilePhoto) {
    errors["profilePhoto"] = "Profile photo is required";
    isValid = false;
  }

  return { isValid, errors };
};






export const validateModules = (modules) => {
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    if (!module.title.trim()) {
      displayToastAlert(300, `Module ${i + 1} is title cannot be empty`);
      return false;
    }
    if (!module.description.trim()) {
      displayToastAlert(300, `Module ${i + 1} is description cannot be empty`);
      return false;
    }
    if (!module.video) {
      displayToastAlert(300, `Module ${i + 1} is video file cannot be empty`);
      return false;
    }
  }
  return true; 
};
