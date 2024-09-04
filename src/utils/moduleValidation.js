import { displayToastAlert } from "./displayToastAlert";

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
