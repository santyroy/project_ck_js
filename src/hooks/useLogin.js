import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/api";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/ShowError";

export const useLogin = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      const { user, jwt } = data.data.data;
      setUser({ isLoggedIn: true, ...user, jwt });
      navigate("/dashboard");
    },
    onError: (error) => showErrorToast(error),
  });
};
