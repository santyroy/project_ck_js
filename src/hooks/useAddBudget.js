import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBudget } from "../services/api";
import toast from "react-hot-toast";

export const useAddBudget = (axiosPrivate, setShowModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["newBudget"],
    mutationFn: (data) => addBudget(axiosPrivate, data),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Budget added successfully");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
