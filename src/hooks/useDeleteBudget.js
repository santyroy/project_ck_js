import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudgetById } from "../services/api";

export const useDeleteBudget = (axiosPrivate, id) => {
  // console.log("useDeleteBudget: ", budgetId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBudget", id],
    mutationFn: (budgetId) => deleteBudgetById(axiosPrivate, budgetId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });
};
