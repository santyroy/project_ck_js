import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/api";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/ShowError";

export const useOneTimePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["OTP"],
    mutationFn: (data) => verifyOTP(data),
    onSuccess: () => navigate("/login", { replace: true }),
    onError: (error) => showErrorToast(error),
  });
};
