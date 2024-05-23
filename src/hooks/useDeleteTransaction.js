import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionById } from "../services/api";
import toast from "react-hot-toast";

export const useDeleteTransaction = (axiosPrivate) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: (id) => deleteTransactionById(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactionsByUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactionsByBudget"],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalIncomeAndExpenseByUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalIncomeAndExpenseByBudget"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactionSummaryByBudget"],
      });
      toast.success("Transaction deleted successfully");
    },
  });
};
