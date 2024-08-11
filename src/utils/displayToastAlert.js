import { toast } from "react-toastify";

export const displayToastAlert = (status, message) => {
  const options = {
    position: "bottom-right",
    draggable: true,
  };
  if (status === 100) {
    toast.info(message, options);
  } else if (status === 200) {
    toast.success(message, options);
  } else if (status === 300) {
    toast.warning(message, options);
  } else {
    toast.error(message, options);
  }
};
