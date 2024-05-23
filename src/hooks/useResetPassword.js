import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/ShowError";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => resetPassword(data),
    onSuccess: () => navigate("/login", { replace: true }),
    onError: (error) => showErrorToast(error),
  });
};
