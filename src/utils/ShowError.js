import toast from "react-hot-toast";

export const showErrorToast = (error) => {
  error.response?.data?.message
    ? toast.error(error.response?.data?.message)
    : toast.error("Something went wrong");
};
