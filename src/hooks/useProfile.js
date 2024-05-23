import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/api";
import toast from "react-hot-toast";
import useAuthContext from "./useAuthContext";

export const useUpdateProfile = (axiosPrivate, userId, resetField) => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationKey: ["updateProfile", userId],
    mutationFn: (data) => updateUser(axiosPrivate, userId, data),
    onSuccess: (data) => {
      console.log(data);
      const { name, email, picture } = data.data.data;
      setUser((prev) => {
        return { ...prev, name, email, picture };
      });
      toast.success("Profile Updation successful");
      resetField("password");
    },
  });
};
