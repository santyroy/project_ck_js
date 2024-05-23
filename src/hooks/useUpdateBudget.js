import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget } from "../services/api";
import toast from "react-hot-toast";

export const useUpdateBudget = (axiosPrivate, setShowModal, budgetId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBudget", budgetId],
    mutationFn: (data) => updateBudget(axiosPrivate, data, budgetId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Budget updated successfully");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
