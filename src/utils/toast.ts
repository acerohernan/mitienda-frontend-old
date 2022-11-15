import toaster from "react-hot-toast";

const success = (message: string) =>
  toaster.success(message, {
    style: {
      padding: "16px",
    },
    position: "bottom-center",
  });
const error = (message: string) =>
  toaster.error(message, {
    style: {
      padding: "16px",
    },
    position: "bottom-center",
  });

const toast = { success, error };

export const useToast = () => toast;
