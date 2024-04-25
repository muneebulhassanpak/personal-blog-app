import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMessage = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const failureMessage = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
