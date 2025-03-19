import { toast } from "react-toastify";

export const showToast = (message, type) => {
    // Takes error type and message
    return toast[type](message, { toastId: message }); // Ensures the same toast message doesnt repeat
};