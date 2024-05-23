import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import { showErrorToast } from "../utils/ShowError";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (data) => forgotPassword(data),
    onSuccess: (_, variables) => {
      navigate("/resetPassword", {
        replace: true,
        state: { email: variables.email },
      });
    },
    onError: (error) => showErrorToast(error),
  });
};
