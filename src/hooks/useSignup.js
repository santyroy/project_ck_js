import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { showErrorToast } from "../utils/ShowError";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data) => signupUser(data),
    onSuccess: (data) => {
      navigate("/otp", {
        state: { userId: data.data.data.userId, email: data.data.data.email },
      });
    },
    onError: (error) => showErrorToast(error),
  });
};
