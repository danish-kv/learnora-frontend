import toast from "react-hot-toast";

export const displayToastAlert = (status, message) => {
  console.log(status, message);

  const options = {
    position: "top-right",
    duration: 4000,
    style: {
      padding: "16px",
      borderRadius: "8px",
    },
  };

  switch (status) {
    case 100:
      toast(message, {
        ...options,
        icon: "🔵",
      });
      break;
    case 200:
      toast.success(message, options);
      break;
    case 300:
      toast(message, {
        ...options,
        icon: "⚠️",
        style: {
          ...options.style,
          backgroundColor: "#fef08a",
          color: "#854d0e",
        },
      });
      break;
    default:
      toast.error(message, options);
  }
};
