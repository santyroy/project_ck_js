import { useQuery } from "@tanstack/react-query";
import { findTransactionSummaryByBudget } from "../services/api";

export const useFetchTransactionSummaryByBudget = (axiosPrivate, budgetId) => {
  return useQuery({
    queryKey: ["transactionSummaryByBudget", budgetId],
    queryFn: () => findTransactionSummaryByBudget(axiosPrivate, budgetId),
  });
};
